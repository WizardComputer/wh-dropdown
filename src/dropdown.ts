import { LitElement, html, css } from 'lit'
import { customElement, property } from 'lit/decorators.js'
import { MenuItem } from "./item"

@customElement('wh-dropdown')
export class Dropdown extends LitElement {
  static styles = css`
  ul {
    list-style-type: none;
    margin: 0;
    padding: var(--padding, 0);
    min-width: var(--min-width, 0);
    width: 14rem;
    z-index: 50;
    position: absolute;
    overflow-y: scroll;
    background-color: var(--background-color, white);
    max-width: var(--max-width, auto);
    border-radius: var(--border-radius, 0.25rem);
    box-shadow: var(--box-shadow, rgba(0, 0, 0, 0.1) 0px 10px 15px -3px, rgba(0, 0, 0, 0.05) 0px 4px 6px -2px);
    height: 0;
    border-width: 1px;
    border-style: solid;
    border-color: #e8e8e8;
    opacity: 0;
    transition: opacity 150ms ease-out;
  }
  
  .open {
    opacity: 1;
    height: auto;
    transition: opacity 150ms ease-out;
  }
  
  ::slotted(*[slot="button"]) {
    padding: .5rem 1rem .5rem 1rem;
    font-size: 0.875rem;
    font-weight: 500;
    justify-content: center;
    display: inline-flex;
    border-width: 1px;
    background-color: white;
    border-style: solid;
    color: #374151;
    user-select: none;
    border-color: #D1D5DB;
    border-radius: 0.375rem;
    box-shadow: rgba(0, 0, 0, 0.05) 0px 1px 2px 0px;
  }
  
  ::slotted(*:hover[slot="button"]) {
    background-color: #F9FAFB;
  }
`

  @property()
  opened: boolean = false

  @property()
  distance: number = 0

  @property()
  skidding: number = 0

  @property({ attribute: false })
  list: Array<MenuItem>

  connectedCallback() {
    super.connectedCallback()

    this.setAttribute("tabindex", "0")
    this.addEventListener("keydown", this.handleKeyPress)
  }

  disconnectedCallback() {
    this.removeEventListener("keydown", this.handleKeyPress)
    super.disconnectedCallback()
  }

  protected render() {
    return html`
      <slot name="button" @click="${this.toggle}"></slot>
      <ul class="${this.opened ? 'open' : ''}" style="margin-top: ${this.distance}px; margin-left: ${this.skidding}px;">
          <slot></slot>
      </ul>
    `
  }

  firstUpdated() {
    this.list = Array.from(document.getElementsByTagName("wh-menu-item")) as MenuItem[]
    if (this.opened) this.focus()
  }

  private handleClick = (e: Event) => {
    if (this.opened && !this.contains(e.target as Node)) return this.close()
    this.dispatchEvent(new CustomEvent("wh-select", { detail: { item: e.target } }))
  }

  private toggle = () => {
    if (this.opened) return this.close()
    this.open()
  }

  open = () => {
    this.opened = true
    //Don't close dropdown when opening
    setTimeout(() => document.addEventListener("click", this.handleClick))
  }

  close = () => {
    this.opened = false
    this.focus()
    document.removeEventListener("click", this.handleClick)
  }

  private handleKeyPress(e: KeyboardEvent) {
    switch (e.code) {
      case "Tab":  this.handleFocus(e); break
      case "Enter": this.handleEnter(e.target); break
      case "Escape": this.close(); break
      case "ArrowDown": case "ArrowUp": this.handleArrowKeys(e); break
    }
  }

  private handleEnter(target: EventTarget | null) {
    if (target === this) return this.toggle()
    this.dispatchEvent(new CustomEvent("wh-select", { detail: { item: target } }))
  }

  private navigate(e: KeyboardEvent) {
    //Prevent page scroll
    e.preventDefault()

    if (document.activeElement === this) return this.list[0].focus()
    this.move(e.code)
  }

  private move(direction: String) {
    if (direction === "ArrowDown") return this.moveDown()
    this.moveUp()
  }

  private moveUp() {
    const nextElement = document.activeElement.previousElementSibling as MenuItem

    if (nextElement && this.list.includes(nextElement)) return nextElement.focus()
    this.list[this.list.length - 1].focus()
  }

  private moveDown() {
    const nextElement = document.activeElement.nextElementSibling as MenuItem

    if (nextElement && this.list.includes(nextElement)) return nextElement.focus()
    this.list[0].focus()
  }

  private handleFocus(e) {
    if (this.opened) {
      e.preventDefault()
      if (document.activeElement === this) return this.list[0].focus()
      if (document.activeElement?.tagName.toLowerCase() === "wh-menu-item") {
        this.close()
        this.focus()
      }
    }
  }

  private handleArrowKeys(e) {
    e.preventDefault()
    this.opened ? this.navigate(e) : this.open()
  }
}