import { css } from 'lit-element'

export default css`
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
    background-color: var(--focus-background-color, #f4fbff);
  }
`