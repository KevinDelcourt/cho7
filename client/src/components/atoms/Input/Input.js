import styled from "styled-components"

const Input = styled.input`
    border-radius: ${props => props.borderRadius || "5px"};
    padding: 5px;
    margin-bottom: 7px;
`

export default Input
