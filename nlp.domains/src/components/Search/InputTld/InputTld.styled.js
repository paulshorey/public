import styled from "styled-components"

export const Styled = styled.div`
  position: relative;
  cursor: pointer;
  &::before {
    content: ".";
    position: absolute;
    left: 0.5rem;
    font-weight: 900;
    line-height: 2.33rem;
    height: 100%;
    color: var(--color-attention-dark);
  }
  input {
    background: none;
    padding-left: 1rem;
    color: var(--color-attention-dark);
    font-weight: bold;
    font-family: "Quicksand", sans-serif;
    border: none;
  }
  .caret {
    content: ".";
    position: absolute;
    right: 1rem;
    font-size: 2rem;
    font-weight: 900;
    line-height: 2.2rem;
    height: 100%;
    color: var(--color-attention-dark);
    pointer-events: none;
  }
`
