# wh-dropdown
Simple dropdown custom component

- Works with all frameworks 🧩
- Fully customizable with CSS 🎨
- Includes Tailwind inspired style 🖼
- Can navigate with keyboard ⌨️
- Open source 😸

Designed in Mostar@wizardhealth by [Baki](https://instagram.com/zgembac).

---
##Installation

Npm installation:
```bash
npm i @wizardhealth/wh-dropdown
```
or Yarn:
```bash
yarn add @wizardhealth/wh-dropdown
```
## Usage
An example of a simple dropdown is added to the [index.html](https://github.com/WizardComputer/wh-dropdown/blob/main/index.html) file. In order for anything to show up in the list at least one `wh-menu-item` element with text needs to be added. The button for opening the dropdown can be any element you like as long as it contains a `slot="button"` attribute:
```html
<wh-dropdown>
  <span slot="button">Button Name</span>
  <wh-menu-item>First Item</wh-menu-item>
  <wh-menu-item>Second Item</wh-menu-item>
  <wh-menu-item>Third Item</wh-menu-item>
</wh-dropdown>
```

### Attributes

#### opened
The _opened_ attribute determines the visibility of the item list. The property can be set as an html attribute while defining the dropdown. Setting the attribute like this:
```html
<wh-dropdown opened></wh-dropdown>
```
This will start the dropdown opened. Omitting the attribute will render the component closed.

#### skidding
The _skidding_ attribute determines the position of the item list on the X axis. The property is set as follows:
```html
<wh-dropdown skidding="25"></wh-dropdown>
```
The number adds the margin-left property in pixels. The attribute can take on negative values as well.

#### distance
The _distance_ attribute determines the distance between the opener button and the item list:
```html
<wh-dropdown distance="15"></wh-dropdown>
```
The number adds the margin-top property in pixels

### Events
Selecting an item by clicking or by pressing Enter will invoke a `wh-select` event. Listening to this event will provide the item that was selected via `event.item`:
```js
document.getElementById("custom-element").addEventListener(e => {
  console.log(e.detail.item)
});
```
### Browser support
- Chrome
- Firefox
- Safari

---

### Forking the Repo
Start by [forking the repo](https://github.com/WizardComputer/wh-dropdown/fork) on GitHub, then clone it locally and install dependencies.
```bash
git clone https://github.com/YOUR_GITHUB_USERNAME/wh-dropdown
cd wh-dropdown
npm install
```

### Developing
Once you've cloned the repo, run the following command.

```bash
npm run start
```

This will spin up the web dev server. After the initial build, a browser will open automatically.

Hot module reloading (HMR) is enabled, so all changes to the source will reload the browser automatically.

### Building

To generate a production build, run the following command.

```bash
npm run build
```

### Contributing

All WizardHealth components are open source projects and contributions are encouraged! If you're interested in contributing, please review the [contribution guidelines](CONTRIBUTING.md) first.

👇 Your support is very much appreciated! 👇

- [Star on GitHub](https://github.com/WizardComputer/wh-dropdown)
- [Follow on Instagram](https://instagram.com/zgembac)