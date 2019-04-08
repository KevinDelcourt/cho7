import styled from "styled-components"

const Label = styled.label`
    font-family: ${props => props.font || "Arial"};
    color: ${props => props.color};
    font-size: 18px;
`

export default Label
