import { css } from 'lit-element';
export const style = css `
  ul {
    list-style-type: none;
    margin: 0;
    padding: var(--padding, 0);
    min-width: var(--min-width, 0);
    z-index: 50;
    position: absolute;
    overflow-y: scroll;
    background-color: var(--background-color, white);
    max-width: var(--max-width, auto);
    border-radius: var(--border-radius, 0.25rem);
    box-shadow: var(--box-shadow, rgba(0, 0, 0, 0.24) 0px 3px 8px);
    height: 0;
    opacity: 0;
    transition: opacity 150ms ease-out;
  }
  
  .open {
    opacity: 1;
    height: auto;
    transition: opacity 150ms ease-out;
  }
`;
//# sourceMappingURL=panel.js.map