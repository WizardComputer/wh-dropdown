import { html, LitElement } from "lit"
import styles from "./styles/item"

export default class MenuItem extends LitElement {
  static get is() { return "wh-menu-item" }

  static get styles() { return styles }

  static get properties() {
    return { hasFocus: { type: Boolean } }
  }

  constructor() {
    super()
    this.hasFocus = false
  }

  firstUpdated(changedProperties) {
    this._$menuItem = this.shadowRoot.querySelector("li")
  }

  connectedCallback() {
    super.connectedCallback()

    this.setAttribute("tabindex", -1)
  }

  focus() {
    this._$menuItem.focus()
  }

  blur() {
    this._$menuItem.blur()
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

  select(e) {
    const elementToSelect = this._$menuItem.querySelector("slot").assignedElements()[0]
    if (e.keyCode === 13 && elementToSelect) elementToSelect.click()
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

customElements.define(MenuItem.is, MenuItem)
