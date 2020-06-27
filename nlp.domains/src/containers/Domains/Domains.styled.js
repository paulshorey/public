import styled from "styled-components"

export const H5Styled = styled.h5`
  content: ":";
  &::after {
    content: ":";
  }
  color: hsl(201, 81%, 61%);
  font-weight: 600;
  font-size: 0.75rem;
  line-height: 1.5rem;
  margin: 0.8rem 0 0.4rem;
  text-transform: capitalize;
`

export const ShowLinkStyled = styled.span`
  background: transparent;
  user-select: none;
  position: absolute;
  top: -0.125rem;
  right: 0;
  cursor: pointer;
  //color: currentColor;
  font-size: 0.9rem;
  text-align: right;
  font-weight: 600;
  height: 2rem;
  line-height: 1.9rem;
  border-radius: 1.125rem;
  margin-right: -1px;
  padding: 0;
  svg {
    font-size: 1.25rem;
    vertical-align: middle;
    margin-top: -0.125rem;
  }
  svg.gicon-sliders {
    height: 24px;
    line-height: 1;
    vertical-align: middle;
    margin: 0 -1px 0 1px;
    fill: currentColor;
    position: relative;
    top: -1px;
  }
  svg.toggleNLPThesaurus {
    position: relative;
    top: 0.125rem;
    right: 0.125rem;
    font-size: 1.33rem !important;
  }
  svg.faBolt {
    transform: scale(0.67);
  }
`

export const ColorsStyled = styled.div`
  // default not available
  .dom_name,
  .dom_name .ant-checkbox {
    color: hsl(0, 0%, 67%);
  }
  // exact match available!
  .dom_name.status-exact,
  .dom_name.status-exact .ant-checkbox {
    //color: var(--color-attention);
    .dom_card {
      box-shadow: 0 1px 1px currentColor !important;
      &::before {
        content: " ";
        position: absolute;
        top: 0;
        left: 0;
        right: 0;
        bottom: 0;
        border-radius: 1.25rem;
        box-shadow: var(--box-shadow-attention);
      }
    }
  }
  // not checked yet
  .dom_name.status-unknown,
  .dom_name.status-unknown .ant-checkbox {
    color: var(--color-dark);
  }
  // available
  .dom_name.status-available,
  .dom_name.status-available .ant-checkbox {
    color: var(--color-accent-darker);
  }
  // premium
  .dom_name.status-premium,
  .dom_name.status-premium .ant-checkbox {
    color: var(--color-accent);
  }
  // unknown
  .dom_name.status-other,
  .dom_name.status-other .ant-checkbox {
    color: var(--color-other);
  }
  // premium
  .dom_name.status-expiring,
  .dom_name.status-expiring .ant-checkbox {
    color: var(--color-accent);
  }

  /*
   * domain suggestions (while getting availability, until received results)
   */
  &.gotAvailability {
  }
`
