import { LitElement } from "lit";
export declare class MenuItem extends LitElement {
    static styles: import("lit").CSSResultGroup;
    hasFocus: boolean;
    item: HTMLElement;
    connectedCallback(): void;
    focus(): void;
    blur(): void;
    handleBlur(): void;
    handleFocus(): void;
    handleMouseEnter(): void;
    handleMouseLeave(): void;
    select(e: KeyboardEvent): void;
    render(): import("lit").TemplateResult;
}
//# sourceMappingURL=item.d.ts.map