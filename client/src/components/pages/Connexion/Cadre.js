import styled from "styled-components";

const Cadre = styled.div`
  border: 2px dotted black;
  width: ${props => props.w}vw;
  height: ${props => props.h}vh;
  margin-left: ${props => props.left}vw;
  margin-top: ${props => props.top}vh;
  display: inline-block;
`;



export default Cadre;