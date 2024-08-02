import styled, { css } from "styled-components";

/*const test = css`
  text-align: center;
  ${10 > 5 && "background-color: yellow"}
`;*/

const Heading = styled.h1`
  ${(props) =>
    props.type === "h1" &&
    css`
      font-size: 3rem;
      font-weight: 600px;
    `}
  ${(props) =>
    props.type === "h2" &&
    css`
      font-size: 2rem;
      font-weight: 600px;
    `}
  ${(props) =>
    props.type === "h3" &&
    css`
      font-size: 1rem;
      font-weight: 500px;
    `}



  line-height: 1.4
`;

export default Heading;
