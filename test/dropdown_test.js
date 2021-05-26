import { expect } from '@esm-bundle/chai';
import { fixture, html } from '@open-wc/testing';
import { Dropdown } from "../dropdown.js";
suite("wh-dropdown", () => {
    test("is defined", () => {
        const el = document.createElement('wh-dropdown');
        expect(el).to.be.an.instanceOf(Dropdown);
    });
    test("renders correct html", async () => {
        const el = await fixture(html `
      <wh-dropdown>
        <span slot="button">Button Name</span>
        <wh-menu-item>Item</wh-menu-item>
      </wh-dropdown>`);
        expect(el.shadowRoot.innerHTML).to.include(`
      <slot name="button"></slot>
      <ul class="" style="margin-top: 0px; margin-left: 0px;">
          <slot></slot>
      </ul>
    `);
    });
    test("slot[name='button'] opens panel", async () => {
        const element = await fixture(html `
      <wh-dropdown>
        <span id="opener" slot="button">Button Name</span>
        <wh-menu-item>Item</wh-menu-item>
      </wh-dropdown>`);
        const button = element.shadowRoot.querySelector('slot[name="button"]');
        button.click();
        await element.updateComplete;
        const panel = element.shadowRoot.querySelector("ul");
        expect(panel.classList.contains("open")).to.be.true;
    });
});
//# sourceMappingURL=dropdown_test.js.map