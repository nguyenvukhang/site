import { useState } from 'preact/hooks'
import { Menu, Cross } from '../assets/icons'
import { Link } from 'preact-router/match'
import { HTML } from '../types'
import Router from 'preact-router'

const DISPLAY_NAME = 'Khang Nguyen'

export const Header = () => {
  const [menuOpen, setMenuOpen] = useState(false)

  /**
   * The menu button that is shown when the viewport is too small to fit the
   * main menu
   */
  const Hamburger = () => (
    <button class="block sm:hidden" onClick={() => setMenuOpen(!menuOpen)}>
      {menuOpen ? <Cross class="text-fg-dim" /> : <Menu class="text-fg-dim" />}
    </button>
  )

  const PageLink = (props: HTML['a']) => (
    <Link
      activeClassName="active-page-link"
      class="leading-7 text-fg-dim text-center hover:text-fg hover:no-underline transition ease-in-out font-semibold"
      {...props}
    />
  )

  /**
   * A list of pages to navigate to. Bundled together because they can appear
   * in multiple areas.
   */
  const PageList = () => (
    <>
      <PageLink href="/projects">Projects</PageLink>
      <PageLink href="/blog">Blog</PageLink>
      <PageLink href="/resume">Resume</PageLink>
    </>
  )

  const Suffix = (props: HTML['span']) => (
    <>
      <span class="text-slate-400 font-light"> &mdash; </span>
      <span {...props} />
    </>
  )

  return (
    <>
      <div class="flex flex-col mt-20 py-10 items-center">
        <div class="flex flex-row w-full">
          <div class="flex-1 text-2xl">
            <a href="/" class="font-bold quiet">
              {DISPLAY_NAME}
            </a>
            <Router>
              <Suffix path="/projects/:x?">Projects</Suffix>
              <Suffix path="/blog/:x?">Blog</Suffix>
              <Suffix path="/resume/:x?">Resume</Suffix>
            </Router>
          </div>
          <div class="hidden sm:block space-x-8">
            <PageList />
          </div>
          <Hamburger />
        </div>
      </div>
      {menuOpen ? (
        <div class="block sm:hidden relative">
          <div class="absolute w-full flex flex-col py-6 space-y-8 backdrop-blur-xl bg-white/40 border">
            <PageList />
          </div>
        </div>
      ) : null}
      <hr class="border-0.5 border-neutral-200" />
    </>
  )
}
