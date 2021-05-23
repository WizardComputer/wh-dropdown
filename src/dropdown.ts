import {LitElement, html, css} from 'lit';
import {customElement, property} from 'lit/decorators.js';
import styles from "./styles/panel"
import { MenuItem } from "./item"

@customElement('wh-dropdown')
export class Dropdown extends LitElement {
  static get styles() { return styles }

  @property()
  opened: boolean = false

  @property()
  distance: number = 0

  @property()
  skidding: number = 0

  render() {
    return html`
      <slot name="button" @click="${this._toggle}"></slot>
      <ul class="${this.opened ? 'open' : ''}" style="margin-top: ${this.distance}px; margin-left: ${this.skidding}px;">
          <slot></slot>
      </ul>
    `
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

  _handleClick({ target }) {
    if (this.opened && !this.contains(target)) return this.close()
    this.dispatchEvent(new CustomEvent("wh-select", { detail: { item: target } }))
  }

}