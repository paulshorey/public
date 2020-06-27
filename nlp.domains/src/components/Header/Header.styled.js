import styled from "styled-components"

export const StyledHeadContainer = styled.div`
  &.wrapInContainer {
    height: 2.5rem;
    background: var(--color-primary);
    position: relative;
    margin-bottom: 0;
  }
`

export const StyledHeader = styled.div`
  position: relative;
`
export const StyledHead = styled.div`
  position: fixed;
  background: var(--color-primary-overlay);
  z-index: 1000;
  height: 2.5rem;
  line-height: 2.3rem;
  padding-top: 1px;
  width: 100%;
`
export const StyledLogoContainer = styled.div`
  h2 {
    user-select: none;
    font-family: "Quicksand", sans-serif;
    padding: 0;
    margin: 0;
    height: auto;
    line-height: 1;
    white-space: nowrap;
    text-indent: -0.1rem;
    font-size: 1.125rem;
    display: inline-block;
    font-weight: 700;
    color: hsl(0, 0%, 80%);
    position: relative;
    top: 1px;
    a {
      color: var(--color-warmwhite);
    }
    b {
      font-weight: 900;
    }
    .vmiddle {
      vertical-align: baseline;
    }
    .color-accent {
      color: var(--color-accent-light);
    }
  }
  h5 {
    margin: 0;
    padding: 0;
    line-height: 0;
    height: auto;
    text-transform: uppercase;
    color: var(--color-primary-overlay);
    font-size: 0.9rem;
    font-weight: 600;
  }
`
export const StyledRightburger = styled.div`
  position: absolute;
  top: 0.44rem;
  right: -1px;
  font-size: 1rem;
  line-height: 1rem;
  cursor: pointer;
  > * {
    vertical-align: middle;
  }
  .faBars {
    font-size: 1.3rem;
    line-height: 1;
    display: inline-block;
    color: var(--color-subtle-light);
  }
  h6 {
    font-size: 1.125rem;
  }
  hr {
  }
`
