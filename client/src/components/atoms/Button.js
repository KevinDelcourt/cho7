import styled from "styled-components"

const Button = styled.button`
    background-color: ${props => props.bgColor};
    border: ${props => props.border || "none"};
    border-radius: 5px;
    padding: 5px 15px;
    height: 35px;
    font-size: 18px;
`

export default Button
