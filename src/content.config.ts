import { defineCollection, z } from 'astro:content'

const articles = defineCollection({
  // Type-check frontmatter using a schema
  schema: z.object({
    title: z.string(),
    description: z.string(),
    tags: z.array(z.string()).optional(),
    pubDate: z
      .string()
      .or(z.date())
      .transform((val) => new Date(val ? val : '')),
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
