var __decorate = (this && this.__decorate) || function (decorators, target, key, desc) {
    var c = arguments.length, r = c < 3 ? target : desc === null ? desc = Object.getOwnPropertyDescriptor(target, key) : desc, d;
    if (typeof Reflect === "object" && typeof Reflect.decorate === "function") r = Reflect.decorate(decorators, target, key, desc);
    else for (var i = decorators.length - 1; i >= 0; i--) if (d = decorators[i]) r = (c < 3 ? d(r) : c > 3 ? d(target, key, r) : d(target, key)) || r;
    return c > 3 && r && Object.defineProperty(target, key, r), r;
};
import { LitElement, html, css } from 'lit';
import { customElement, property } from 'lit/decorators.js';
let Dropdown = class Dropdown extends LitElement {
    constructor() {
        super(...arguments);
        this.opened = false;
        this.distance = 0;
        this.skidding = 0;
        this.handleClick = (e) => {
            if (this.opened && !this.contains(e.target))
                return this.close();
            this.dispatchEvent(new CustomEvent("wh-select", { detail: { item: e.target } }));
        };
        this.toggle = () => {
            if (this.opened)
                return this.close();
            this.open();
        };
        this.open = () => {
            this.opened = true;
            //Don't close dropdown when opening
            setTimeout(() => document.addEventListener("click", this.handleClick));
        };
        this.close = () => {
            this.opened = false;
            this.focus();
            document.removeEventListener("click", this.handleClick);
        };
    }
    connectedCallback() {
        super.connectedCallback();
        this.setAttribute("tabindex", "0");
        this.addEventListener("keydown", this.handleKeyPress);
    }
    disconnectedCallback() {
        this.removeEventListener("keydown", this.handleKeyPress);
        super.disconnectedCallback();
    }
    render() {
        return html `
      <slot name="button" @click="${this.toggle}"></slot>
      <ul class="${this.opened ? 'open' : ''}" style="margin-top: ${this.distance}px; margin-left: ${this.skidding}px;">
          <slot></slot>
      </ul>
    `;
    }
    firstUpdated() {
        this.list = Array.from(document.getElementsByTagName("wh-menu-item"));
        if (this.opened)
            this.focus();
    }
    handleKeyPress(e) {
        switch (e.code) {
            case "Tab":
                this.handleFocus(e);
                break;
            case "Enter":
                this.handleEnter(e.target);
                break;
            case "Escape":
                this.close();
                break;
            case "ArrowDown":
            case "ArrowUp":
                this.handleArrowKeys(e);
                break;
        }
    }
    handleEnter(target) {
        if (target === this)
            return this.toggle();
        this.dispatchEvent(new CustomEvent("wh-select", { detail: { item: target } }));
    }
    navigate(e) {
        //Prevent page scroll
        e.preventDefault();
        if (document.activeElement === this)
            return this.list[0].focus();
        this.move(e.code);
    }
    move(direction) {
        if (direction === "ArrowDown")
            return this.moveDown();
        this.moveUp();
    }
    moveUp() {
        const nextElement = document.activeElement.previousElementSibling;
        if (nextElement && this.list.includes(nextElement))
            return nextElement.focus();
        this.list[this.list.length - 1].focus();
    }
    moveDown() {
        const nextElement = document.activeElement.nextElementSibling;
        if (nextElement && this.list.includes(nextElement))
            return nextElement.focus();
        this.list[0].focus();
    }
    handleFocus(e) {
        var _a;
        if (this.opened) {
            e.preventDefault();
            if (document.activeElement === this)
                return this.list[0].focus();
            if (((_a = document.activeElement) === null || _a === void 0 ? void 0 : _a.tagName.toLowerCase()) === "wh-menu-item") {
                this.close();
                this.focus();
            }
        }
    }
    handleArrowKeys(e) {
        e.preventDefault();
        this.opened ? this.navigate(e) : this.open();
    }
};
Dropdown.styles = css `
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
`;
__decorate([
    property()
], Dropdown.prototype, "opened", void 0);
__decorate([
    property()
], Dropdown.prototype, "distance", void 0);
__decorate([
    property()
], Dropdown.prototype, "skidding", void 0);
__decorate([
    property({ attribute: false })
], Dropdown.prototype, "list", void 0);
Dropdown = __decorate([
    customElement('wh-dropdown')
], Dropdown);
export { Dropdown };
//# sourceMappingURL=dropdown.js.map