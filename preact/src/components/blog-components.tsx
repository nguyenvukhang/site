import { HTML } from '../types'

export const Title = (p: HTML['h1']) => <h1 {...p} class={`font-serif ${p.class}`} />

export const PublishedAt = (p: HTML['div']) => (
  <div class={`text-gray-500 text-sm mb-1 ${p.class}`}>{p.children}</div>
)

export const Summary = (p: HTML['div']) => (
  <div class={`text-sm mb-2 ${p.class}`}>{p.children}</div>
)

export const Tag = (p: HTML['span']) => (
  <span
    class="text-sm bg-accent-100 px-1.5 pb-0.5 rounded-lg cursor-pointer"
    onClick={p.onClick}
  >
    {p.children}
  </span>
)
