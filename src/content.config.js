import { defineCollection, z } from "astro:content"

const firstUpper = new RegExp("^[A-Z]")
const firstUpperMsg = {
  message: "The first letter of the description must be capitalized.",
}

const articles = defineCollection({
  // Type-check frontmatter using a schema
  schema: z.object({
    title: z.string().regex(firstUpper, firstUpperMsg),
    description: z.string().endsWith(".").regex(firstUpper, firstUpperMsg),
    tags: z.array(z.string()).optional(),
    // Parses with YYYY-MM-DD format.
    // https://v3.zod.dev/?id=dates
    pubDate: z.string().date(),
  }),
})

/**
 * Exporting this will allow this usage:
 * ``` Article.astro
 *
 * ---
 * import type { CollectionEntry } from 'astro:content';
 * type Props = CollectionEntry<'articles'>['data'];
 * ---
 *
 * <slot/>
 *
 * ```
 */
export const collections = { articles }
