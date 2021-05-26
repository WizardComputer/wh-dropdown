"use strict";
var __extends = (this && this.__extends) || (function () {
    var extendStatics = function (d, b) {
        extendStatics = Object.setPrototypeOf ||
            ({ __proto__: [] } instanceof Array && function (d, b) { d.__proto__ = b; }) ||
            function (d, b) { for (var p in b) if (Object.prototype.hasOwnProperty.call(b, p)) d[p] = b[p]; };
        return extendStatics(d, b);
    };
    return function (d, b) {
        if (typeof b !== "function" && b !== null)
            throw new TypeError("Class extends value " + String(b) + " is not a constructor or null");
        extendStatics(d, b);
        function __() { this.constructor = d; }
        d.prototype = b === null ? Object.create(b) : (__.prototype = b.prototype, new __());
    };
})();
var __makeTemplateObject = (this && this.__makeTemplateObject) || function (cooked, raw) {
    if (Object.defineProperty) { Object.defineProperty(cooked, "raw", { value: raw }); } else { cooked.raw = raw; }
    return cooked;
};
var __decorate = (this && this.__decorate) || function (decorators, target, key, desc) {
    var c = arguments.length, r = c < 3 ? target : desc === null ? desc = Object.getOwnPropertyDescriptor(target, key) : desc, d;
    if (typeof Reflect === "object" && typeof Reflect.decorate === "function") r = Reflect.decorate(decorators, target, key, desc);
    else for (var i = decorators.length - 1; i >= 0; i--) if (d = decorators[i]) r = (c < 3 ? d(r) : c > 3 ? d(target, key, r) : d(target, key)) || r;
    return c > 3 && r && Object.defineProperty(target, key, r), r;
};
exports.__esModule = true;
exports.Dropdown = void 0;
var lit_1 = require("lit");
var decorators_js_1 = require("lit/decorators.js");
var panel_1 = require("./styles/panel");
var Dropdown = /** @class */ (function (_super) {
    __extends(Dropdown, _super);
    function Dropdown() {
        var _this = _super.call(this) || this;
        _this.opened = false;
        _this.distance = 0;
        _this.skidding = 0;
        _this.handleClick = function (e) {
            if (_this.opened && !_this.contains(e.target))
                return _this.close();
            _this.dispatchEvent(new CustomEvent("wh-select", { detail: { item: e.target } }));
        };
        _this.open = _this.open.bind(_this);
        _this.close = _this.close.bind(_this);
        return _this;
    }
    Dropdown.prototype.connectedCallback = function () {
        _super.prototype.connectedCallback.call(this);
        this.setAttribute("tabindex", 0);
        this.addEventListener("keydown", this.handleKeyPress);
    };
    Dropdown.prototype.disconnectedCallback = function () {
        this.removeEventListener("keydown", this.handleKeyPress);
        _super.prototype.disconnectedCallback.call(this);
    };
    Dropdown.prototype.render = function () {
        return lit_1.html(templateObject_1 || (templateObject_1 = __makeTemplateObject(["\n      <slot name=\"button\" @click=\"", "\"></slot>\n      <ul class=\"", "\" style=\"margin-top: ", "px; margin-left: ", "px;\">\n          <slot></slot>\n      </ul>\n    "], ["\n      <slot name=\"button\" @click=\"", "\"></slot>\n      <ul class=\"", "\" style=\"margin-top: ", "px; margin-left: ", "px;\">\n          <slot></slot>\n      </ul>\n    "])), this.toggle, this.opened ? 'open' : '', this.distance, this.skidding);
    };
    Dropdown.prototype.firstUpdated = function () {
        this.list = this.shadowRoot.querySelector("ul > slot").assignedElements({ flatten: true });
        if (this.opened)
            this.focus();
    };
    Dropdown.prototype.toggle = function () {
        if (this.opened)
            return this.close();
        this.open();
    };
    Dropdown.prototype.open = function () {
        var _this = this;
        this.opened = true;
        //Don't close dropdown when opening
        setTimeout(function () { return document.addEventListener("click", _this.handleClick); });
    };
    Dropdown.prototype.close = function () {
        this.opened = false;
        this.focus();
        document.removeEventListener("click", this.handleClick);
    };
    Dropdown.prototype.handleKeyPress = function (e) {
        switch (e.code) {
            case "9":
                this.handleFocus(e);
                break;
            case "13":
                this.handleEnter(e.target);
                break;
            case "27":
                this.close();
                break;
            case "40":
            case "38":
                this.handleArrowKeys(e);
                break;
        }
    };
    Dropdown.prototype.handleEnter = function (target) {
        if (target === this)
            return this.toggle();
        this.dispatchEvent(new CustomEvent("wh-select", { detail: { item: target } }));
    };
    Dropdown.prototype.navigate = function (e) {
        //Prevent page scroll
        e.preventDefault();
        if (document.activeElement === this)
            return this.list[0].focus();
        this.move(e.code);
    };
    Dropdown.prototype.move = function (direction) {
        if (direction === "40")
            return this.moveDown();
        this.moveUp();
    };
    Dropdown.prototype.moveUp = function () {
        var nextElement = document.activeElement.previousElementSibling;
        if (nextElement && this.list.includes(nextElement))
            return nextElement.focus();
        this.list[this.list.length - 1].focus();
    };
    Dropdown.prototype.moveDown = function () {
        var nextElement = document.activeElement.nextElementSibling;
        if (nextElement && this.list.includes(nextElement))
            return nextElement.focus();
        this.list[0].focus();
    };
    Dropdown.prototype.handleFocus = function (e) {
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
    };
    Dropdown.prototype.handleArrowKeys = function (e) {
        e.preventDefault();
        this.opened ? this.navigate(e) : this.open();
    };
    Dropdown.styles = panel_1["default"];
    __decorate([
        decorators_js_1.property()
    ], Dropdown.prototype, "opened");
    __decorate([
        decorators_js_1.property()
    ], Dropdown.prototype, "distance");
    __decorate([
        decorators_js_1.property()
    ], Dropdown.prototype, "skidding");
    __decorate([
        decorators_js_1.query('wh-menu-item')
    ], Dropdown.prototype, "list");
    Dropdown = __decorate([
        decorators_js_1.customElement('wh-dropdown')
    ], Dropdown);
    return Dropdown;
}(lit_1.LitElement));
exports.Dropdown = Dropdown;
var templateObject_1;
