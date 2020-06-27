import styled from "styled-components"

export const AboutUs = styled.div`
  h2 {
    font-size: 1.5rem;
    line-height: 2.75rem;
  }
  p {
    font-size: 1.125rem;
  }
`

export const AboutUsTable = styled.div`
  display: flex;
  .bio-spacer {
    width: 4%;
  }
  .bio {
    width: 58%;
    text-align: center;
    h3 {
      font-size: 1.67rem;
      font-weight: bold;
      color: var(--color-attention-dark);
      text-shadow: 1px 1px 1px rgba(0, 0, 0, 0.123);
      //font-family: "Quicksand", sans-serif;
    }
    img {
      width: 100%;
      max-width: 400px;
      height: auto;
    }
    p {
      margin: 0.5rem 0 1rem;
      text-align: left;
    }
  }
`

export const TitleWithButton = styled.div`
  position: relative;
  margin-top: 1rem;
  button {
    position: absolute;
    top: 0;
    right: 0;
  }
`
export const TitleWithXLink = styled.div`
  margin: 0 0.5rem;
  line-height: 2rem;
  svg {
    float: right;
    line-height: 2.3rem;
    font-size: 1.9rem;
    margin: 0 -0.09rem;
  }
`

export const ComparisonTable = styled.table`
  th,
  td {
    padding-right: 1rem;
    max-width: 20rem;
    text-overflow: ellipsis;
  }
`

export const ContactUsButton = styled.button`
  border: none;
  background: var(--color-link);
  color: white;
  font-weight: bold;
  padding: 0.5rem 1rem;
  border-radius: 0.25rem;
  box-shadow: 0px 1px 2px rgba(0, 0, 0, 0.3);
  svg {
    margin-left: 0.5rem;
  }
`

export const ContactPopup = styled.div`
  position: fixed;
  top: 0;
  left: 0;
  width: 100%;
  height: 100%;
  background: rgba(255, 255, 255, 0.5);
  padding-top: 5rem;
  display: none;
  z-index: 1000000;
  &.active {
    display: block;
  }
  .x {
    position: absolute;
    top: 3rem;
    right: 3rem;
    cursor: pointer;
    font-size: 2.2rem;
  }
`
