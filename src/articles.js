import { defineCollection, getCollection, z } from "astro:content"
import { glob } from "astro/loaders"
import { parse } from "path"

const firstUpper = new RegExp("^[A-Z]")
const firstUpperMsg = {
  message: "The first letter of the description must be capitalized.",
}

// get value of comparison
const cmp = (a, b) => {
  // sort by most recent first.
  if (a.data.pubDate != b.data.pubDate)
    return b.data.pubDate.localeCompare(a.data.pubDate)
  // sort by title in alphabetical order.
  return a.data.title.localeCompare(b.data.title)
}

const articles = {}

articles.defineCollection = defineCollection({
  loader: glob({
    pattern: "*.mdx",
    base: "./src/content/articles",
  }),
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

articles.getCollection = (sorted = false) =>
  getCollection("articles").then((articles) => {
    if (sorted) {
      articles.sort(cmp)
    }
    for (let i = 0; i < articles.length; i++) {
      articles[i].data.slug = parse(articles[i].filePath).name
    }
    return articles
  })

articles.getStaticPaths = () =>
  articles.getCollection().then((articles) =>
    articles.map((article) => ({
      params: { slug: article.data.slug },
      props: article,
    })),
  )

export default articles
