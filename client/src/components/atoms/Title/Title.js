import styled from "styled-components"

const Title = styled.h2`
    font-size: ${props => props.size};
    font-family: ${props => props.font};
    color: ${props => props.color};
    margin-bottom: 30px;
`

export default Title
