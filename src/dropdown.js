import { html, LitElement } from "lit-element"
import styles from "./styles/panel"
import { MenuItem } from "./item"

export default class Dropdown extends LitElement {
  static get is() { return "wh-dropdown" }

  static get styles() { return styles }

  static get properties() {
    return {
      opened: { type: Boolean },
      distance: { type: Number },
      skidding: { type: Number }
    }
  }

  constructor() {
    super()
    this.opened = false
    this.open = this._open.bind(this)
    this.close = this._close.bind(this)
    this.distance = 0
    this.skidding = 0
  }

  connectedCallback() {
    super.connectedCallback()

    this.setAttribute("tabindex", 0)
    this.addEventListener("keydown", this._handleKeyPress)
    this._handleClick = this._handleClick.bind(this)
  }

  disconnectedCallback() {
    this.removeEventListener("keydown", this._handleKeyPress)
    super.disconnectedCallback()
  }

  render() {
    return html`
        <slot name="button" @click="${this._toggle}"></slot>
        <ul class="${this.opened ? 'open' : ''}" style="margin-top: ${this.distance}px; margin-left: ${this.skidding}px;">
            <slot></slot>
        </ul>
    `
  }

  firstUpdated(changedProperties) {
    this._$list = this.shadowRoot.querySelector("ul > slot").assignedElements({flatten: true})
    if (this.opened) this.focus()
  }

  _handleClick({ target }) {
    if (this.opened && !this.contains(target)) return this.close()
    this.dispatchEvent(new CustomEvent("wh-select", { detail: { item: target } }))
  }

  _toggle() {
    if (this.opened) return this.close()
    this.open()
  }

  _open() {
    this.opened = true
    //Don't close dropdown when opening
    setTimeout(() => document.addEventListener("click", this._handleClick))
  }

  _close() {
    this.opened = false
    this.focus()
    document.removeEventListener("click", this._handleClick)
  }

  _handleKeyPress(e) {
    switch (e.keyCode) {
      case 9:  this._handleFocus(e); break
      case 13: this._handleEnter(e); break
      case 27: this.close(); break
      case 40: case 38: this._handleArrowKeys(e); break
    }
  }

  _handleEnter({ target }) {
    if (target === this) return this._toggle()
    this.dispatchEvent(new CustomEvent("wh-select", { detail: { item: target } }))
  }

  _navigate(e) {
    //Prevent page scroll
    e.preventDefault()

    if (document.activeElement === this) return this._$list[0].focus()
    this._move(e.keyCode)
  }

  _move(direction) {
    if (direction === 40) return this._moveDown()
    this._moveUp()
  }

  _moveUp() {
    const nextElement = document.activeElement.previousElementSibling

    if (nextElement && this._$list.includes(nextElement)) return nextElement.focus()
    this._$list[this._$list.length - 1].focus()
  }

  _moveDown() {
    const nextElement = document.activeElement.nextElementSibling

    if (nextElement && this._$list.includes(nextElement)) return nextElement.focus()
    this._$list[0].focus()
  }

  _handleFocus(e) {
    if (this.opened) {
      e.preventDefault()
      if (document.activeElement === this) return this._$list[0].focus()
      if (document.activeElement?.tagName.toLowerCase() === "wh-menu-item") {
        this.close()
        this.focus()
      }
    }
  }

  _handleArrowKeys(e) {
    e.preventDefault()
    this.opened ? this._navigate(e) : this.open()
  }
}
