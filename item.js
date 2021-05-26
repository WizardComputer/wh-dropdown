var __decorate = (this && this.__decorate) || function (decorators, target, key, desc) {
    var c = arguments.length, r = c < 3 ? target : desc === null ? desc = Object.getOwnPropertyDescriptor(target, key) : desc, d;
    if (typeof Reflect === "object" && typeof Reflect.decorate === "function") r = Reflect.decorate(decorators, target, key, desc);
    else for (var i = decorators.length - 1; i >= 0; i--) if (d = decorators[i]) r = (c < 3 ? d(r) : c > 3 ? d(target, key, r) : d(target, key)) || r;
    return c > 3 && r && Object.defineProperty(target, key, r), r;
};
import { css, html, LitElement } from "lit";
import { customElement, property, query } from "lit/decorators";
let MenuItem = class MenuItem extends LitElement {
    constructor() {
        super(...arguments);
        this.hasFocus = false;
    }
    connectedCallback() {
        super.connectedCallback();
        this.setAttribute("tabindex", "-1");
    }
    focus() {
        this.item.focus();
    }
    blur() {
        this.item.blur();
    }
    handleBlur() {
        this.hasFocus = false;
    }
    handleFocus() {
        this.hasFocus = true;
    }
    handleMouseEnter() {
        this.focus();
    }
    handleMouseLeave() {
        this.blur();
    }
    select(e) {
        const elementToSelect = this.querySelector("slot").assignedElements()[0];
        if (e.code === "Enter" && elementToSelect)
            this.click();
    }
    render() {
        return html `
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
    `;
    }
};
MenuItem.styles = css `
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
`;
__decorate([
    property()
], MenuItem.prototype, "hasFocus", void 0);
__decorate([
    query('li')
], MenuItem.prototype, "item", void 0);
MenuItem = __decorate([
    customElement('wh-menu-item')
], MenuItem);
export { MenuItem };
//# sourceMappingURL=item.js.map