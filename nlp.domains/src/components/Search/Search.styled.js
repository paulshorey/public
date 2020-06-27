import styled from "styled-components"
// import { isRetina } from "universal-common-scripts/functions/ui"

export const Styled = styled.div`
  position: relative;
  z-index: 100;
  .content {
    padding: 5.625rem 0 3.75rem 0;
    @media (max-width: 599px) {
      padding: 4.75rem 0 3rem 0;
    }
  }
  
  /*
   * Background on Results/Blog pages:
   */
  background: var(--color-primary);
  background: var(--color-gradient-primary);
  box-shadow: var(--box-shadow-dark);
  &::before {
    content: ' ';
    position: absolute;
    top: 0;
    left: 0;
    width: 100%;
    height: 100%;
    background: var(--color-gradient-primary-before);
    opacity:0.33;
  }
  &::after {
    content: ' ';
    position: absolute;
    top: 0;
    left: 0;
    width: 100%;
    height: 100%;
    background: url('/bg-domains1.png');
    background-size: cover;
    opacity: 0.25;
  }
  > * {
    position: relative;
    z-index: 100;
  }

  /*
   * Background on Homepages only:
   */
  &.SearchHome {
    position: relative;
    background: var(--color-gradient-home-large);
    
    .show_poss {
      display: none;
    }
    .content {
      padding-top: 9.5rem;
      padding-bottom: 7.5rem;
      @media (max-width: 1399px) {
        .wordart {
          right: -2.5rem;
        }
      }
      @media (max-width: 1349px) {
        .wordart {
          right: -5rem;
        }
      }
      @media (max-width: 1299px) {
        padding-top: 11.11rem;
        padding-bottom: 9.25rem;
        .wordart {
          right: -5.5rem;
        }
      }
      @media (max-width: 799px) {
        padding-top: 10rem;
        padding-bottom: 8.25rem;
        .wordart {
          right: -3.5rem;
          top: 0.5rem;
          height: calc(100% - 1rem);
        }
      }
      @media (max-width: 599px) {
        padding-top: 8rem;
        padding-bottom: 7rem;
        .wordart {
          right: -2.5rem;
          width: calc(100% + 4rem);
          top: -0.25rem;
          height: calc(100% + 0.25rem);
        }
      }
    }
  }

  /*
   * Title
   */
  .title {
    position: relative;
    font-size: 1.5rem;
    line-height: 1.9rem;
    font-weight: 600;
    color: hsl(0, 0%, 95%);
    font-family: 'Quicksand', sans-serif;
    margin-top: -0.25rem;
    margin-bottom: 0.75rem;
    @media (max-width: 799px) {
      margin-top: 0;
      font-size: 1.4rem;
      line-height: 1.75rem;
    }
    @media (max-width: 699px) {
      font-size: 1.3rem;
      line-height: 1.5rem;
    }
    @media (max-width: 599px) {
      font-size: 1.25rem;
      line-height: 1.125rem;
    }
  }
  /*
   * Title nav
   */
  .title_nav {
    position: absolute;
    top: -1px;
    right: 0;
    font-weight: 600;
    font-size: 1.25rem;
  }

  /*
   * Cues
   */
  .cue_container {
    position:relative;
    margin: 0.75rem 0 -0.75rem;
    font-family: 'Quicksand', sans-serif;
    color: var(--color-subtle);
  }
  /*
   * Cue
   */
  .cue {
    position: relative;
    max-width: 40rem; /* should be same width as input-group */
    font-weight: 600;
    font-size: 1rem;
    > * {
      white-space: nowrap;
    }
    @media (max-width: 1299px) {
      font-weight: 600;
      .cue-extra-line {
        font-weight: 400;
        color: inherit;
      }
    }
    @media (max-width: 599px) {
      font-size: 85%;
    }
  }
  /*
   * Cue nav
   */
  .cue_nav {
    font-size: 1rem;
    position: absolute;
    right: 1px;
    top: 0;
    bottom: auto;
    padding: 0 0 0.67rem;
    cursor: pointer;
    user-select: none;
    color: var(--color-subtle);
    white-space:nowrap;
    svg {
      font-size: 1.1em;
      vertical-align: -0.21em;
      margin-left: 0.1rem;
      width: auto;
    }
    .smaller {
      font-size: 0.9em;
      padding: 0;
      margin: 0;
      line-height: 1em;
      bottom: auto;
    }
  }

  /*
   * Input group (pill box)
   */
  .input-group {
    //width: 33rem;
    max-width: calc(100vw - 2.8rem);
    border-radius: 1.28rem;
    margin: 0 -1px 0 -1px;
    font-weight: 400;
    box-shadow: var(--box-shadow-black) !important;
    display: inline-flex;
    background: var(--color-coolwhite);
    /*
     * Layout / style
     */
    > *,
    .InputTld input {
      border-radius: 0;
    }
    > *:first-child {
      flex-grow: 1;
      /* 
      * If .Input is disabled, first child will be .SelectTld
      */
      border-top-left-radius: 1.25rem;
      border-bottom-left-radius: 1.25rem;
      padding-left: 1.25rem;
      &.input-padding {
        width: 0;
        flex-grow: 0;
      }
    }
    > *:last-child {
      border-top-right-radius: 1.25rem;
      border-bottom-right-radius: 1.25rem;
    }
    .Input,
    .InputTld input,
    .Button,
    .SelectTld {
      height: 2.25rem;
      line-height: 1;
      background:none; // background controlled by .input-group
    }
    .Input {
      overflow: hidden;
      padding-right: 0.25rem;
      font-size: 1.125rem;
      font-weight: 500;
      flex-grow: 1;
      letter-spacing: 0.25px;
      var(--color-attention);
      min-width: 7rem;
      color: var(--color-attention-dark);
      //caret-color: var(--color-attention);
      &::placeholder {
        color: var(--color-attention-dark);
      }
    }
    .Button {
      overflow: hidden;
      padding-left: 1rem;
      padding-right: 1.25rem;
      text-align: center;
      min-width: 2.5rem;
      font-size: 1.25rem;
      font-weight: 600;
      font-family: 'Quicksand', sans-serif;
      span {
        //position:relative;
        //top: -1px;
      }
      i {
      }
    }
    /*
     * .Input - interactions
     */
    .Input {
      padding-top: 1px;
      padding-bottom: 0;
      border: none;
    }
    .InputTld input:focus,
    .Input:focus {
      box-shadow: inset 1px 1.25px 3.5px rgba(0, 0, 0, 0.5);
    }
    /*
     * Select TLD 
     */
    .InputTld {
    }
    /*
     * .Button - interactions
     */
    .Button {
      border: none;
      outline: none;
      color: var(--color-attention-dark);
      box-shadow: 1px 1px 1px rgba(0, 0, 0, 0.25);
    }
    .Button:hover {
      box-shadow: inset 100px 100px 100px rgba(0, 0, 0, 0.1) !important;
      //color: white;
    }
    .Button:focus {
      box-shadow: inset 100px 100px 100px rgba(0, 0, 0, 0.2) !important;
      //color: white;
    }
    /*
     * Select - interactions
     */
    .SelectTld {
      background: var(--color-coolwhite);
      @media (max-width: 599px) {
        font-size: 1rem;
      }
    }
    .SelectTld div[class*='-placeholder'],
    .SelectTld div[class*='-singleValue'] {
      //color: var(--color-medium);
      color: var(--color-attention-dark);
    }
    .SelectTld:hover div[class*='-control'] {
      box-shadow: inset 100px 100px 100px rgba(0, 0, 0, 0.1) !important;
    }
    .SelectTld:focus div[class*='-container'],
    .SelectTld:focus-within div[class*='-container'] {
      box-shadow: inset 1px 2px 3px rgba(0, 0, 0, 0.2) !important;
      border: none !important;
      outline: none !important;
    }
  }

`
