const sections = document.querySelectorAll("section");
const navLi = document.querySelectorAll(".navbar .container ul li");

window.onscroll = function () {
    scrollFunction()
    // interestSticky()
};

function scrollFunction() {
    if (
        document.body.scrollTop > 60 ||
        document.documentElement.scrollTop > 60
    ) {
        navbar.classList.remove("py-lg-3", "bg-transparent", "navbar-queen-blue")
        navbar.classList.add("py-lg-0", "bg-primary", "navbar-light")

        document.getElementById("logo_span").style.display = "none"
        document.getElementById("svg_nav").style.fill = "#FCFCFC"
        navbar.style.transition = "0.3s"

        // darkSwitcher.style.cssText = `
        //     top: 7%;
        //     right: 2%;
        // `
        // lightSwitcher.style.cssText = `
        //     top: 7%;
        //     right: 2%;
        // `
    } else {
        // darkSwitcher.style.cssText = `
        //     top: 10%;
        //     right: 10%;
        // `
        // lightSwitcher.style.cssText = `
        //     top: 10%;
        //     right: 10%;
        // `

        if (navbar.classList.contains("bg-palette1-black-darker")) {
            navbar.classList.remove("py-lg-0", "bg-primary", "navbar-queen-blue")
            navbar.classList.add("py-lg-3", "bg-transparent", "navbar-palette1-white")
            document.getElementById("svg_nav").style.fill = "#FCFCFC"
        } else {
            navbar.classList.remove("py-lg-0", "bg-primary", "navbar-light")
            navbar.classList.add("py-lg-3", "bg-transparent", "navbar-queen-blue")
            document.getElementById("svg_nav").style.fill = "#356CAB"
        }

        document.getElementById("logo_span").style.display = "inline-block"
        navbar.style.transition = "0.3s"
    }

    var current = "";

    sections.forEach((section) => {
        const sectionTop = section.offsetTop;
        if (scrollY >= sectionTop - 100) {
            current = section.getAttribute("id");
        }
    });

    navLi.forEach((li) => {
        li.classList.remove("active");
        if (li.classList.contains(current)) {
            li.classList.add("active");
        }
    });
}


window.addEventListener('DOMContentLoaded', event => {

    // Navbar shrink function
    var navbarShrink = function () {
        const navbarCollapsible = document.body.querySelector('#mainNav');
        if (!navbarCollapsible) {
            return;
        }
        if (window.scrollY === 0) {
            navbarCollapsible.classList.remove('navbar-shrink')
        } else {
            navbarCollapsible.classList.add('navbar-shrink')
        }

    };
    navbarShrink();
    document.addEventListener('scroll', navbarShrink);

    // Activate Bootstrap scrollspy on the main nav element
    const mainNav = document.body.querySelector('#mainNav');
    if (mainNav) {
        new bootstrap.ScrollSpy(document.body, {
            target: '#mainNav',
            offset: 74,
        });
    };

    const navbarToggler = document.body.querySelector('.navbar-toggler');
    const responsiveNavItems = [].slice.call(
        document.querySelectorAll('#navbarResponsive .nav-link')
    );
    responsiveNavItems.map(function (responsiveNavItem) {
        responsiveNavItem.addEventListener('click', () => {
            if (window.getComputedStyle(navbarToggler).display !== 'none') {
                navbarToggler.click();
            }
        });
    });

});

var interest = document.getElementById("int-nav")
var contact = document.getElementById("con-nav")

var intHeader = document.getElementById("int-header")
var navbar = document.getElementById("main-navbar")

var stop = (interest.offsetTop - 150)

function addStickyClass(elem) {
    elem.classList.add("sticky-xl-top", "pt-5")
    elem.classList.remove("py-lg-5", "py-5")
}

function removeStickyClass(elem) {
    elem.classList.remove("sticky-xl-top", "pt-5")
    elem.classList.add("py-lg-5", "py-5")
}

function interestSticky() {
    var scrollTop = (window.pageYOffset !== undefined) ? window.pageYOffset : (document.documentElement || document.body.parentNode || document.body).scrollTop;

    // console.log(elemCards)

    for (i = 0; i < elemCards.length; i++) {
        if (scrollTop >= stop) {
            addStickyClass(interest)
            intHeader.style.display = "none"

            elemCards[i].style.padding = 0
            elemCards[i].childNodes[1].style.display = "none"
        } else {
            removeStickyClass(interest)
            intHeader.style.display = "block"

            elemCards[i].style.padding = "2rem 0"
            elemCards[i].childNodes[1].style.display = "block"
        }
    }
}

function showModal(img_id) {
    var imgPath = document.getElementById(img_id).querySelectorAll("img")

    document.getElementById("selectedImage").src = imgPath[0].src
}

// ==================
//   Theme Switcher
// ==================

// Variable definitions

var darkSwitcher = document.getElementById("dark-switcher")
var lightSwitcher = document.getElementById("light-switcher")

// Navbar
var navbar = document.getElementById("main-navbar")

// Header
var pageHeader = document.getElementById("page-header")
var socials = document.getElementById("social-menu")
var nameText = document.getElementById("name_text")
var webdevSpan = document.getElementById("webdev_span")
var bgPhoto = document.getElementById("photo")

// About Me
var aboutSection = document.getElementById("about-nav")
var aboutPhoto = document.getElementById("about_photo")
var aboutRow = document.getElementById("row_about")
var csSpan = document.getElementById("cs_span")
var tabRow = document.getElementsByClassName("tabrow")
var downloadBtn = document.getElementById("download_btn")
var hireBtn = document.getElementById("hire_btn")

// Experience
var expSection = document.getElementById("exp-nav")

// Interests
var intSection = document.getElementById("int-nav")
var elemCards = document.getElementsByClassName("card")
var elemIcons = document.getElementsByClassName("icons")

// Photography
var photoSection = document.getElementById("photo-nav")

// Contact
var contactSection = document.getElementById("con-nav")
var contactRow = document.getElementById("con-row")
var sendBtn = document.getElementById("send-btn")

// Footer
var footerSection = document.getElementById("footer")
var footerSocials = document.getElementsByClassName("bi")

function darkToggler() {
    darkHeader()
    darkAbout()
    darkExperience()
    darkInterests()
    darkPhotography()
    darkContact()
    darkFooter()
}

function lightToggler() {
    lightHeader()
    lightAbout()
    lightExperience()
    lightInterests()
    lightPhotography()
    lightContact()
    lightFooter()
}

function darkHeader() {

    navbar.classList.remove(
        "bg-primary",
        "navbar-queen-blue"
    )

    navbar.classList.add(
        "bg-palette1-black-darker",
        "navbar-light"
    )

    pageHeader.classList.remove(
        "bg-palette4-periwinkle-crayola",
        "text-palette4-dark-blue"
    )

    pageHeader.classList.add(
        "bg-palette1-black",
        "text-palette1-white"
    )

    bgPhoto.classList.remove("photo-light")
    bgPhoto.classList.add("photo-dark")

    socials.classList.add("socials-dark")

    darkSwitcher.style.display = "none"
    lightSwitcher.style.display = "block"
}

function lightHeader() {

    navbar.classList.add(
        "bg-primary",
        "navbar-queen-blue"
    )

    navbar.classList.remove(
        "bg-palette1-black-darker",
        "navbar-light"
    )

    pageHeader.classList.remove(
        "bg-palette4-dark-blue",
        "text-palette4-periwinkle-crayola"
    )

    pageHeader.classList.add(
        "bg-palette4-periwinkle-crayola",
        "text-palette4-dark-blue"
    )

    socials.classList.remove("socials-dark")
    bgPhoto.classList.add("photo-light")
    bgPhoto.classList.remove("photo-dark")

    darkSwitcher.style.display = "block"
    lightSwitcher.style.display = "none"
}

function darkAbout() {
    aboutSection.classList.remove(
        "bg-light",
        "text-palette4-dark-blue"
    )

    aboutSection.classList.add(
        "bg-palette1-gray",
        "text-palette1-white"
    )

    aboutPhoto.style.backgroundColor = "#0a0a0a"
    aboutRow.style.cssText = `
        background-color: #171616;
        box-shadow: -5px 5px 16px -10px #1b1e20, 
        5px -5px 16px -10px #1b1e20, 
        -5px -5px 16px -10px #1b1e20, 
        5px 10px 16px -10px #1b1e20;
    `
    csSpan.style.color = "#ef626c"
    for (i = 0; i < tabRow.length; i++) {
        tabRow[i].style.borderBottom = "1px solid #f6e8ea"
    }
    darkButtons()
}

function darkButtons() {
    downloadBtn.classList.remove('btn-primary')
    downloadBtn.classList.add("btn-pink")

    hireBtn.classList.remove("btn-secondary")
    hireBtn.classList.add("btn-teal")
}

function lightAbout() {

    aboutSection.classList.add(
        "bg-light",
        "text-palette4-dark-blue"
    )

    aboutSection.classList.remove(
        "bg-palette1-gray",
        "text-palette1-white"
    )

    aboutPhoto.style.backgroundColor = "#8A92AB"
    aboutRow.style.cssText = `
        background-color: $gray-light;
        box-shadow: -5px 5px 16px -10px darken($gray-light, 20%), 
        5px -5px 16px -10px darken($gray-light, 20%), 
        -5px -5px 16px -10px darken($gray-light, 20%), 
        5px 10px 16px -10px darken($gray-light, 20%);
    `
    csSpan.style.color = "#356CAB"
    for (i = 0; i < tabRow.length; i++) {
        tabRow[i].style.borderBottom = "1px solid #002A32"
    }
    lightButtons()
}

function lightButtons() {
    downloadBtn.classList.add('btn-primary')
    downloadBtn.classList.remove("btn-pink")

    hireBtn.classList.add("btn-secondary")
    hireBtn.classList.remove("btn-teal")
}

function darkExperience() {
    expSection.classList.remove("bg-palette4-cool-gray", "text-light")
    expSection.classList.add("bg-palette1-pink-darker", "text-palette1-white")
}

function lightExperience() {
    expSection.classList.add("bg-palette4-cool-gray", "text-light")
    expSection.classList.remove("bg-palette1-pink-darker", "text-palette1-white")
}

function darkInterests() {
    intSection.classList.remove("bg-light", "text-palette4-dark-blue")
    intSection.classList.add("bg-palette1-gray", "text-palette1-white")

    for (i = 0; i < elemCards.length; i++) {
        elemCards[i].style.cssText = `
            background-color: #171616;
            box-shadow: -5px 5px 10px -15px #1b1e20, 
            5px -5px 10px -15px #1b1e20, 
            -5px -5px 10px -15px #1b1e20, 
            5px 10px 10px -15px #1b1e20;
        `
        elemIcons[i].style.filter = "invert(1)"
    }
}

function lightInterests() {
    intSection.classList.add("bg-light", "text-palette4-dark-blue")
    intSection.classList.remove("bg-palette1-gray", "text-palette1-white")

    for (i = 0; i < elemCards.length; i++) {
        elemCards[i].style.cssText = `
            background-color: #F5F5F5;
            box-shadow: -5px 5px 10px -15px #C2C2C2, 
            5px -5px 10px -15px #C2C2C2, 
            -5px -5px 10px -15px #C2C2C2, 
            5px 10px 10px -15px #C2C2C2;
        `
        elemIcons[i].style.filter = "invert(0)"
    }
}

function darkPhotography() {
    photoSection.classList.remove("bg-light")
    photoSection.classList.add("bg-palette1-gray", "text-palette1-white")
}

function lightPhotography() {
    photoSection.classList.add("bg-light")
    photoSection.classList.remove("bg-palette1-gray", "text-palette1-white")
}

function darkContact() {
    contactSection.classList.remove("bg-light")
    contactSection.classList.add("bg-palette1-gray", "text-palette1-white")

    contactRow.style.cssText = `
        background-color: #171616;
        box-shadow: -5px 5px 10px -15px #1b1e20, 
        5px -5px 10px -15px #1b1e20, 
        -5px -5px 10px -15px #1b1e20, 
        5px 10px 10px -15px #1b1e20;
    `

    sendBtn.classList.remove("btn-primary")
    sendBtn.classList.add("btn-pink")
}

function lightContact() {
    contactSection.classList.add("bg-light")
    contactSection.classList.remove("bg-palette1-gray", "text-palette1-white")

    contactRow.style.cssText = `
        background-color: #8A92AB;
        box-shadow: -5px 5px 10px -15px #c2c2c2, 
        5px -5px 10px -15px #c2c2c2, 
        -5px -5px 10px -15px #c2c2c2, 
        5px 10px 10px -15px #c2c2c2;
    `

    sendBtn.classList.add("btn-primary")
    sendBtn.classList.remove("btn-pink")
}

function darkFooter() {
    footerSection.classList.remove("bg-primary", "text-light")
    footerSection.classList.add("bg-palette1-black-darker", "text-palette1-white")

    for (i = 0; i < footerSocials.length; i++) {
        if (footerSocials[i].classList.contains("text-light")) {
            footerSocials[i].classList.remove("text-light")
            footerSocials[i].classList.add("text-palette1-white")
        }
    }
}

function lightFooter() {
    footerSection.classList.add("bg-primary", "text-light")
    footerSection.classList.remove("bg-palette1-black-darker", "text-palette1-white")

    for (i = 0; i < footerSocials.length; i++) {
        if (footerSocials[i].classList.contains("text-light")) {
            footerSocials[i].classList.add("text-light")
            footerSocials[i].classList.remove("text-palette1-white")
        }
    }
}