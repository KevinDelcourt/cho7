import styled from "styled-components";

const CadreLogo = styled.div`
  border: 2px dotted black;
  width: 126px;
  height: 126px;
  margin-left: ${props => props.left}vw;
  margin-top: ${props => props.top}vh;
  display: inline-block;
`;

export default CadreLogo;