import { defineConfig } from 'astro/config';
import mdx from "@astrojs/mdx";

import tailwindcss from "@tailwindcss/vite";

export default defineConfig({
  site: 'https://naufalhilmiaji.github.io',
  integrations: [mdx()],

  markdown: {
    shikiConfig: {
      themes: {
        light: "one-light",
        dark: "one-dark-pro",
      },
    },
  },

  vite: {
    plugins: [tailwindcss()],
  },
});