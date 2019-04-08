import styled from "styled-components"

const Textarea = styled.textarea`
    border-radius: ${props => props.borderRadius || "10px"};
    padding: 8px;
    width: 100%;
`

export default Textarea
