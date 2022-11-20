import styled from "styled-components"
interface containerProps {
    width?: string;
    height?: string;
    order?: number;
    direction: "column" | "row";

  }


const Container = styled.div<containerProps>`
  flex-flow: ${(props) => props.direction} wrap;
  width: ${(props) => props.width};
  height: ${(props) => props.height};
  order: ${(props) => props.order};
  background-color: white;

`;

export default Container