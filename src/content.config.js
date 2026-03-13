import articles from "./articles"

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
export const collections = { articles: articles.defineCollection }
