import { LitElement } from 'lit';
import { MenuItem } from "./item";
export declare class Dropdown extends LitElement {
    static styles: import("lit").CSSResultGroup;
    opened: boolean;
    distance: number;
    skidding: number;
    list: Array<MenuItem>;
    connectedCallback(): void;
    disconnectedCallback(): void;
    protected render(): import("lit").TemplateResult;
    firstUpdated(): void;
    private handleClick;
    private toggle;
    open: () => void;
    close: () => void;
    private handleKeyPress;
    private handleEnter;
    private navigate;
    private move;
    private moveUp;
    private moveDown;
    private handleFocus;
    private handleArrowKeys;
}
//# sourceMappingURL=dropdown.d.ts.map