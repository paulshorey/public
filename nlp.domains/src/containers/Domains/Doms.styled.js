import styled from "styled-components"
import { isRetina } from "universal-common-scripts/functions/ui"

export const DomsStyled = styled.div`
  flex-grow: 1;
  .doms_group {
    position: relative;
    padding-right: 1rem;
    margin-top: 2.5rem;
    @media (max-width: 1299px) {
      padding-right: 0;
    }
    .doms_title {
      position: absolute;
      top: -2.5rem;
      text-indent: 0.2rem;
      pointer-events: none;
    }
    .doms_content {
      .dom_name {
        position: relative;
        display: inline-block;
        margin: 0 0 0.125rem 0;
        width: 33%;
        @media (max-width: 1299px) {
          width: 50%;
        }
        @media (max-width: 999px) {
          width: 100%;
        }
        .dom_card {
          position: relative;
          width: calc(100% - 1.5rem);
          @media (max-width: 1299px) {
            width: calc(100% - 2rem);
          }
          @media (max-width: 999px) {
            width: calc(100% - 2.25rem);
          }
          margin: 0 1.5rem 0.33rem 0;
          line-height: 2.25rem;
          height: 2.3rem;
          background: ${isRetina() ? "var(--color-white-retina)" : "var(--color-white)"};
          box-shadow: var(--box-shadow-dark);
          border-radius: 1.125rem;
          padding: 0 1.25rem;
          cursor: pointer;
          .price {
            font-size: 0.9rem;
          }
          .icon {
            position: absolute;
            top: 0;
            right: 0.9rem;
            svg {
              position: relative;
              transform: scale(0.6);
              top: 0.05rem;
              &.faDollarSign {
                transform: scale(0.7);
                top: 0.1rem;
                margin-left: -0.125rem;
              }
              &.faDoubleQuestion {
                margin-left: -0.25rem;
              }
              &.faHeart {
                top: 0.075rem;
                transform: scale(0.7);
              }
              &.faStar {
                transform: scale(0.8);
              }
            }
            .textQuestion {
              font-size: 0.95rem;
              line-height: 1;
              top: -0.065rem;
              position: relative;
              font-weight: 600;
              opacity: 0.9;
              padding-right: 0.2875rem;
            }
          }
          .word {
            padding-right: 0.1rem;
            font-size: 1.125rem;
            font-weight: 400;
          }
        }
      }
      .dom_name.unlimit {
        line-height: 1;
        padding: 0;
        margin: 0;
        font-size: 0.75rem;
        color: var(--color-link);
        display: block;
        font-weight: 600;
        text-align: right;
        position: relative;
        height: 0;
        float: right;
        > span {
          cursor: pointer;
          padding: 0.25rem 2.5rem 0 0;
          /*
         * should be same offset from right
         * as dom_card
         */
          //@media (max-width: 1299px) {
          //  padding-right: 2rem;
          //}
          //@media (max-width: 999px) {
          //  padding-right: 2rem;
          //}
        }
      }
    }
  }
`
