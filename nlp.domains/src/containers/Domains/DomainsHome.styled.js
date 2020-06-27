import styled from "styled-components"

export const DomainsHomeStyled = styled.div`
  .cue {
    color: var(--color-subtle-transparent);
  }
  .highlighted {
    border: solid 2px var(--color-attention);
    border-radius: 3px;
  }
  .color-attention-dark {
    text-shadow: 1px 1px 1px rgba(222, 222, 222, 0.22);
  }
  .container {
    font-size: 1rem;
    position: relative;
    font-weight: 400;
    color: #666;
    text-shadow: 1px 1px 1px rgba(222, 222, 222, 0.44);
    background: hsla(33, 33%, 99%);
    background: linear-gradient(
      to bottom,
      hsla(30, 10%, 99%),
      hsla(26, 20%, 98%),
      hsla(22, 25%, 97%),
      hsla(18, 30%, 96%)
    );
    .h-text-scroll-up {
      padding-left: 1rem;
      font-size: 1rem;
      font-weight: 400;
    }
    /*
     * link styles
     */
    a {
      color: var(--color-accent-dark);
      text-shadow: 1px 1px 1px rgba(250, 150, 200, 0.1);
      text-decoration: underline;
    }
    .ajs {
      text-decoration: none;
      &:hover {
        text-decoration: underline;
      }
    }
    .q {
      cursor: pointer;
      position: relative;
      display: inline-block;
      padding-right: 0.67rem;
      opacity: 0.9;
      //color: var(--color-accent-dark);
      text-shadow: 1px 1px 1px rgba(250, 150, 200, 0.1);
      text-decoration: none;
      &:hover {
        text-decoration: underline;
      }
      &::before {
        content: "?";
        position: absolute;
        display: inline-block;
        top: -1px;
        right: 0.1rem;
        opacity: 0.7;
        //color: var(--color-accent-dark);
        text-shadow: 1px 1px 1px rgba(250, 150, 200, 0.1);
        font-size: 0.75em;
        font-weight: 800;
      }
    }
    /*
     * top banner
     */
    .opening_statement {
      //font-size: 1.125rem;
      background: var(--color-gradient-background);
      //background: var(--color-subtle-light);
      color: var(--color-primary-dark);
      padding: 0.75rem 0;
      margin: 0;
      //box-shadow: var(--box-shadow-dark);
      border-bottom: solid 1px var(--color-subtle);
      .content {
        margin-top: 0;
        margin-bottom: 0;
        b,
        strong {
          font-weight: 600;
        }
        img {
          position: relative;
          top: 0.35rem;
          left: 0.12rem;
          height: 3rem;
          padding-right: 1.2rem;
        }
        .text {
          flex-grow: 1;
          padding-bottom: 0.125rem;
          > span {
            display: block;
            &:first-child {
              padding: 0.25rem 0 0.1rem;
            }
            &:last-child {
              padding: 0.1rem 0 0.25rem;
              font-size: 0.9em;
            }
          }
        }
      }
    }
    /*
     * article
     */
    .background {
      position: relative;
      &::before {
        content: " ";
        position: absolute;
        top: 0;
        bottom: 0;
        left: 0;
        right: 0;
        background: var(--color-gradient-background);
        opacity: 0.75;
      }
    }
    .examples {
      b {
        font-weight: 400;
        color: inherit;
      }
    }
    article {
      padding: 0.5rem 0 0;
      font-size: 1.125rem;
      p {
        margin: 0.75rem 0;
      }
      > p {
        margin: 0 0 1.25rem;
      }
      .color-medium,
      p {
        text-shadow: 1px 1px 1px rgba(250, 240, 230, 0.1);
        color: var(--color-medium);
        opacity: 0.8;
      }
      .color-light {
        text-shadow: 1px 1px 1px rgba(250, 245, 240, 0.1);
      }
      .br {
        display: block;
        width: 100%;
        position: relative;
        height: 0;
        @media (max-width: 949px) {
          height: 1rem;
        }
      }
      h2,
      h3,
      h4 {
        color: currentColor;
        font-weight: 500;
        &.attention {
          margin-top: 1rem;
          color: var(--color-attention-dark);
          opacity: 0.88;
          font-family: "Quicksand", sans-serif;
          font-weight: 800;
        }
        .dash {
          padding: 0 0.125rem 0 0.4rem;
          font-family: Arial, sans-serif;
        }
        .glasses2020 {
          height: 0.9em;
          line-height: 1em;
          vertical-align: middle;
          margin-bottom: 0.33rem;
          display: inline-block;
          padding-left: 0.5rem;
          filter: brightness(1.05) saturate(1.1);
        }
      }
      h3 {
        font-size: 1.67rem;
      }
      h4 {
        font-size: 1.5rem;
      }
      a b {
        color: inherit;
      }
      b,
      strong {
        font-weight: 600;
      }
      hr,
      .hr {
        border: none;
        height: 1rem;
        display: block;
      }
      ul {
        margin: 1rem 1px 3rem;
        padding: 2.125rem 2.125rem 0.5rem;
        border-left: solid 1px var(--color-subtle-light);
        border-top: solid 1px var(--color-subtle-light);
        background: var(--color-white);
      }
      li {
        margin-bottom: 3rem;
        max-width: 55rem;
        list-style: none;
      }
      button {
        height: 2.5rem;
        line-height: 2.25rem;
        border-radius: 1.125rem;
        font-weight: 600;
        color: white;
        border: none;
        padding: 0 1.125rem;
        background-color: var(--color-accent-dark);
      }
    }
  }
`
