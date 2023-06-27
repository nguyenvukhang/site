import { defineCollection, z } from 'astro:content'

const blog = defineCollection({
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

const projects = defineCollection({
  schema: z.object({
    title: z.string(),
    description: z.string(),
    tags: z.array(z.string()),
    repo: z.string(),
    image: z.string(),
    pubDate: z
      .string()
      .or(z.date())
      .transform((val) => new Date(val ? val : '')),
  }),
})

/**
 * Exporting this will allow this usage:
 * ``` BlogPost.astro
 *
 * ---
 * import type { CollectionEntry } from 'astro:content';
 * type Props = CollectionEntry<'blog'>['data'];
 * ---
 *
 * <slot/>
 *
 * ```
 */
export const collections = { blog, projects }
