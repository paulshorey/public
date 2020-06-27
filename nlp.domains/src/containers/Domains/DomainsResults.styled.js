import styled from "styled-components"
import React from "react"
import { isRetina } from "universal-common-scripts/functions/ui"

export const DomainsResultsStyled = styled.div`
  .cue {
    color: var(--color-subtle);
    //font-weight: 600;
    .faStar {
      transform: scale(0.85);
    }
    > * {
      position: relative;
      top: -0.1875rem;
      &:last-child {
        top: 0;
      }
    }
  }
  .showThesaurus {
    color: var(--color-subtle);
  }
  .spellchecked {
    color: var(--color-subtle-transparent);
  }
  .container {
    position: relative;
    color: #182026;
    min-height: 100vh;
    // background: ${isRetina() ? "var(--color-subtle-light-retina)" : "var(--color-subtle-light)"};
    padding: 0.45rem 0 5rem;
    font-size: 1.125rem;
    &::before {
      content: ' ';
      position:fixed;
      top:0;
      bottom:0;
      left:0;
      right:0;
      background: var(--color-gradient-background);
    }
    .wip {
      .hideWip {
        position:absolute;
        top: 0.25rem;
        right: 0.25rem;
        z-index: 1000000;
        background: transparent;
        cursor: pointer;
      }
      .columns {
        padding-bottom: 2rem;
        margin-bottom: 2rem;
        border-bottom: solid 1px var(--color-light);
        .column {
          width: 12rem;
        }
      }
    }
    .results {
      display: flex;
      .DomsStyled {
      }
      .TldsStyled {
      }
    }
    .showWip {
      z-index: 101;
      top: auto;
      bottom: 0.3rem;
      right: 1.1rem;
      position: fixed;
    }
  }
`
