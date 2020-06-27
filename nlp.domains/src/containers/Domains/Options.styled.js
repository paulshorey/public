import styled from "styled-components"
import { isRetina } from "universal-common-scripts/functions/ui"

export const OptionsStyled = styled.div`
  position: relative;
  z-index: 10;
  margin: 0;
  overflow: auto;
  padding: 0.2rem 0 0;
  color: var(--color-link);
  font-size: 0.9rem;
  //text-shadow: 1px 1px 3px rgba(255, 255, 255, 0.25);
  //box-shadow: var(--box-shadow-light);
  //background: ${isRetina() ? "var(--color-white-retina)" : "var(--color-white)"};
  * {
    font-size: 0.9rem;
  }
  .content {
    padding-top: 0;
    padding-bottom: 0;
  }
  .columns {
    padding: 0.5rem;
    .column {
      margin: 0.5rem;
    }
  }
  .more_options {
    padding: 0.5rem 0 0.5rem 0;
    border-top: solid 1px rgba(0, 0, 0, 0.125);
    margin-top: 1.125rem;
  }
  .options {
    position: relative;
    margin: 0.45rem 0 0.4rem;
    white-space: nowrap;
    .option {
      display: inline-block;
      padding-right: 1rem;
      line-height: 1;
      vertical-align: middle;
      > * {
        line-height: 1;
      }
      .checkbox-group {
        margin-left: 0.75rem;
        color: var(--color-link);
        line-height: 1;
        vertical-align: middle;
        > * {
          line-height: 1;
          vertical-align: middle;
        }
      }
    }
  }
  .showOptions {
    color: var(--color-light);
  }
`
