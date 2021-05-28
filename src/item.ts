import { css, html, LitElement } from "lit"
import { customElement, property, query } from "lit/decorators";

@customElement('wh-menu-item')
export class MenuItem extends LitElement {
  static styles = css`
  li {
    padding: var(--padding, 0 1.25rem 0 1.25rem);
    height: var(--height, 3rem);
    font-weight: 400;
    border-color: var(--border-color, #faf9f4);
    border-bottom-width: var(--border-width, 1px);
    border-bottom-style: solid;
    text-overflow: ellipsis;
    white-space: nowrap;
    background-color: var(--background-color, white);
    width: var(--width, 100%);
    display: flex;
    align-items: center;
    cursor: pointer;
    color: var(--text-color, #373d3f);
    font-size: var(--font-size, 1rem);
  }

  li:hover {
    background-color: var(--hover-background-color, #f4fbff);
  }

  li:focus, .focused {
    outline: none;
    background-color: var(--focus-background-color, #f4fbff);
  }
`

  @property()
  hasFocus: boolean = false

  @query('li')
  item: HTMLElement

  connectedCallback() {
    super.connectedCallback()

    this.setAttribute("tabindex", "-1")
  }

  focus() {
    this.item.focus()
  }

  blur() {
    this.item.blur()
  }

  handleBlur() {
    this.hasFocus = false
  }

  handleFocus() {
    this.hasFocus = true
  }

  handleMouseEnter() {
    this.focus()
  }

  handleMouseLeave() {
    this.blur()
  }

  select(e: KeyboardEvent) {
    const elementToSelect = this.querySelector("slot").assignedElements()[0] as any
    if (e.code === "Enter" && elementToSelect) this.click()
  }

  render() {
    return html`
      <li role="menuitem"
          class="${this.hasFocus ? 'focused' : ''}"
          tabindex="0"
          @focus=${this.handleFocus}
          @blur=${this.handleBlur}
          @mouseenter=${this.handleMouseEnter}
          @mouseleave=${this.handleMouseLeave}
          @keydown="${this.select}"
      >
        <slot></slot>
      </li>
    `
  }
}
