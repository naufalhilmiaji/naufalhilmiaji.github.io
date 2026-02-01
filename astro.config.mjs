import { defineConfig } from 'astro/config';
import mdx from "@astrojs/mdx";

export default defineConfig({
  site: 'https://naufalhilmiaji.github.io',
  integrations: [mdx()],
  markdown: {
    shikiConfig: {
      theme: {
        light: "one-light",
        dark: "one-dark-pro",
      },
    },
  },
});
