import { defineCollection, z } from "astro:content";

export const collections = {
    "project-modals": defineCollection({
        type: "content",
        schema: z.object({
            title: z.string(),
        }),
    }),
};
