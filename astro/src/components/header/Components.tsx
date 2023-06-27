import { Cross, Menu } from '../icons'
import type { HTML } from '../../types'
import { createSignal } from 'solid-js'

const [isOpen, setIsOpen] = createSignal(false)

export const Button = (props: HTML['button']) => (
  <button class={props.class} onclick={() => setIsOpen(!isOpen())}>
    {isOpen() ? <Cross class="text-fg-dim" /> : <Menu class="text-fg-dim" />}
  </button>
)

export const Dropdown = (props: HTML['div']) => (
  <div class={props.class}>{isOpen() ? props.children : null}</div>
)
