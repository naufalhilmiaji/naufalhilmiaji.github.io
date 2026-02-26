(() => {
  function getSectionCommands() {
    const headers = Array.from(document.querySelectorAll("h2"));
    return headers.map((h, i) => {
      if (!h.id) h.id = `section-${i}`;
      return {
        label: `Go to section: ${h.textContent}`,
        action: () => {
          location.hash = `#${h.id}`;
        }
      };
    });
  }

  function getProjectCommandsFromRegistry() {
    const projects = window.__PROJECTS__;
    if (!Array.isArray(projects)) return [];

    return projects.map((project) => ({
      label: `Open project: ${project.title}`,
      action: () => {
        location.href = `/projects/${project.slug}`;
      },
    }));
  }


  function fuzzyMatch(query, text) {
    query = query.toLowerCase();
    text = text.toLowerCase();

    let qi = 0;
    for (let ti = 0; ti < text.length; ti++) {
      if (text[ti] === query[qi]) qi++;
      if (qi === query.length) return true;
    }
    return false;
  }

  function initFoldPersistence() {
    const key = `fold-state:${location.pathname}`;
    const details = Array.from(document.querySelectorAll("details"));

    if (details.length === 0) return;

    // Restore
    try {
      const saved = JSON.parse(localStorage.getItem(key) || "{}");
      details.forEach((d, i) => {
        d.open = saved[i] ?? d.open;
      });
    } catch (_) { }

    // Save on toggle
    details.forEach((d, i) => {
      d.addEventListener("toggle", () => {
        const state = {};
        details.forEach((el, idx) => {
          state[idx] = el.open;
        });
        localStorage.setItem(key, JSON.stringify(state));
      });
    });
  }

  /* =========================
     Theme Toggle
  ========================= */

  function initThemeToggle() {
    const button = document.getElementById('theme-toggle');

    // Check for saved theme
    const savedTheme = localStorage.getItem('theme') || 'light';
    document.documentElement.setAttribute('data-theme', savedTheme);

    button.addEventListener('click', () => {
      const currentTheme = document.documentElement.getAttribute('data-theme');
      const newTheme = currentTheme === 'dark' ? 'light' : 'dark';

      document.documentElement.setAttribute('data-theme', newTheme);
      localStorage.setItem('theme', newTheme);
    });
  }



  /* =========================
     Breadcrumb
  ========================= */

  function initBreadcrumb() {
    const el = document.getElementById("breadcrumb-value");
    if (!el) return;

    const path = window.location.pathname
      .replace(/^\/|\/$/g, "")
      .split("/")
      .filter(Boolean);

    el.textContent = path.length === 0 ? "home" : path.join(" / ");
  }

  /* =========================
     Sticky Navbar
  ========================= */

  function initNavbarScroll() {
    const nav = document.querySelector(".navbar");
    if (!nav) return;

    const onScroll = () => {
      nav.classList.toggle("scrolled", window.scrollY > 8);
    };

    window.addEventListener("scroll", onScroll);
    onScroll();
  }

  /* =========================
     Command Palette (with search)
  ========================= */

  function initCommandPalette() {
    const palette = document.getElementById("command-palette");
    const input = document.getElementById("palette-input");
    const list = document.getElementById("palette-list");

    if (!palette || !input || !list) return;

    const baseCommands = [
      { label: "Go to Home", action: () => (location.href = "/") },
      { label: "Go to Projects", action: () => (location.href = "/projects") },
      { label: "Go to About", action: () => (location.href = "/about") },
      {
        label: "Toggle Theme",
        action: () => document.getElementById("theme-toggle")?.click()
      }
    ];

    let commands = [];

    function rebuildCommands() {
      commands = [
        ...baseCommands,
        ...getSectionCommands(),
        ...getProjectCommandsFromRegistry(),
      ];
    }

    function render(query = "") {
      list.innerHTML = "";

      commands
        .filter((cmd) => fuzzyMatch(query, cmd.label))
        .forEach((cmd) => {
          const li = document.createElement("li");
          li.textContent = cmd.label;
          li.onclick = () => {
            cmd.action();
            close();
          };
          list.appendChild(li);
        });
    }

    function open() {
      rebuildCommands();
      palette.classList.remove("hidden");
      input.value = "";
      render();
      input.focus();
    }

    function close() {
      palette.classList.add("hidden");
    }

    document.addEventListener("keydown", (e) => {
      if ((e.metaKey || e.ctrlKey) && e.key.toLowerCase() === "k") {
        e.preventDefault();
        open();
      }

      if (e.key === "Escape") close();

      // Ignore shortcuts when typing in inputs / palette
      const active = document.activeElement;
      const isTyping =
        active &&
        (active.tagName === "INPUT" ||
          active.tagName === "TEXTAREA" ||
          active.isContentEditable);

      if (isTyping) return;

      // Toggle theme with T
      if (
        e.key.toLowerCase() === "t" &&
        !e.metaKey &&
        !e.ctrlKey &&
        !e.altKey
      ) {
        document.getElementById("theme-toggle")?.click();
      }
    });

    input.addEventListener("input", () => {
      render(input.value);
    });
  }


  /* =========================
     Fold All / Unfold All
  ========================= */

  function initCodeFoldingShortcuts() {
    const getDetails = () =>
      Array.from(document.querySelectorAll("details"));

    document.addEventListener("keydown", (e) => {
      // Fold all: Cmd/Ctrl + Shift + [
      if (
        (e.metaKey || e.ctrlKey) &&
        e.shiftKey &&
        e.code === "BracketLeft"
      ) {
        e.preventDefault();
        getDetails().forEach((d) => (d.open = false));
      }

      // Unfold all: Cmd/Ctrl + Shift + ]
      if (
        (e.metaKey || e.ctrlKey) &&
        e.shiftKey &&
        e.code === "BracketRight"
      ) {
        e.preventDefault();
        getDetails().forEach((d) => (d.open = true));
      }
    });
  }

  function initProjectModal() {
    const modal = document.getElementById("project-modal");
    if (!modal) return;

    const panels = modal.querySelectorAll("[data-project]");
    const closeBtns = modal.querySelectorAll("[data-modal-close]");

    // OPEN MODAL
    document.addEventListener("click", (e) => {
      const card = e.target.closest("[data-project-card]");
      if (!card) return;

      const slug = card.dataset.projectSlug;
      if (!slug) return;

      panels.forEach((panel) => {
        if (panel.dataset.project !== slug) {
          panel.classList.add("hidden");
        } else {
          panel.classList.remove("hidden");
        }
      });

      modal.classList.remove("hidden");
      modal.classList.add("flex");

      // Add a tiny delay to allow the display:flex to apply before triggering opacity transition
      setTimeout(() => {
        const container = modal.querySelector("#modal-content-container");
        if (container) {
          container.style.opacity = "1";
          container.style.transform = "scale(1)";
        }
      }, 10);

      document.body.style.overflow = "hidden";
    });

    // CLOSE MODAL
    function closeModal() {
      const container = modal.querySelector("#modal-content-container");
      if (container) {
        container.style.opacity = "0";
        container.style.transform = "scale(0.95)";
      }

      setTimeout(() => {
        modal.classList.add("hidden");
        modal.classList.remove("flex");
        document.body.style.overflow = "";
      }, 300); // Wait for transition to finish
    }

    document.addEventListener("keydown", (e) => {
      if (e.key === "Escape" && !modal.classList.contains("hidden")) {
        closeModal();
      }
    });

    closeBtns.forEach(btn => btn.addEventListener("click", closeModal));
  }

  /* =========================
     Print / RFC Mode Shortcut
  ========================= */

  function initPrintShortcut() {
    document.addEventListener("keydown", (e) => {
      if ((e.metaKey || e.ctrlKey) && e.key.toLowerCase() === "p") {
        window.print();
      }
    });
  }

  /* =========================
     Auto-generated TOC (Projects)
  ========================= */

  function initTOC() {
    const toc = document.getElementById("toc");
    if (!toc) return;

    const headers = Array.from(document.querySelectorAll("h2"));
    if (headers.length === 0) return;

    toc.innerHTML = "<strong class=\"text-text-main font-mono text-xs uppercase tracking-widest mb-4 block\">// contents</strong>";

    headers.forEach((h, i) => {
      const id = `section-${i}`;
      h.id = id;

      const a = document.createElement("a");
      a.href = `#${id}`;
      a.textContent = h.textContent;
      a.className = "block mb-2 text-text-muted hover:text-accent transition-colors truncate";

      toc.appendChild(a);
    });
  }

  /* =========================
     Init Everything
  ========================= */

  document.addEventListener("mousemove", (e) => {
    const target = e.target.closest(".nav-link, .project-title a");
    if (!target) return;

    const rect = target.getBoundingClientRect();
    target.style.setProperty("--x", `${e.clientX - rect.left}px`);
    target.style.setProperty("--y", `${e.clientY - rect.top}px`);
  });

  const observer = new IntersectionObserver(
    (entries) => {
      entries.forEach((e) => {
        if (e.isIntersecting) {
          e.target.style.opacity = "1";
          e.target.style.transform = "translateY(0)";
          observer.unobserve(e.target);
        }
      });
    },
    { threshold: 0.1 }
  );

  document.querySelectorAll("section:not(.animate-fade-in-up)").forEach((s) => {
    // initialize states for observer
    s.style.opacity = "0";
    s.style.transform = "translateY(15px)";
    s.style.transition = "opacity 0.6s ease-out, transform 0.6s ease-out";
    observer.observe(s);
  });

  document.querySelectorAll("[data-language]").forEach(block => {
    const btn = block.querySelector(".code-copy");
    const code = block.querySelector("pre");
    const copyText = btn?.querySelector(".copy-text");

    if (!btn || !code) return;

    btn.addEventListener("click", async () => {
      const text = code.innerText;
      try {
        await navigator.clipboard.writeText(text);
        if (copyText) copyText.textContent = "Copied!";
        btn.classList.add("text-emerald-400", "border-emerald-400/40");
        setTimeout(() => {
          if (copyText) copyText.textContent = "Copy";
          btn.classList.remove("text-emerald-400", "border-emerald-400/40");
        }, 1500);
      } catch (err) {
        console.error("Failed to copy", err);
      }
    });
  });


  function initUI() {
    initThemeToggle();
    initBreadcrumb();
    initNavbarScroll();
    initCommandPalette();
    initCodeFoldingShortcuts();
    initPrintShortcut();
    initTOC();
    initFoldPersistence();
    initFoldPersistence();
    initProjectModal();
  }

  // Run after DOM is ready
  if (document.readyState === "loading") {
    document.addEventListener("DOMContentLoaded", initUI);
  } else {
    initUI();
  }
})();
