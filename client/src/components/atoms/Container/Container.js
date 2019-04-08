import styled from "styled-components"

const Container = styled.div`
    background-color: ${props => props.bgColor || "rgba(145, 109, 67, 0.35)"};
    border-radius: ${props => props.borderRadius};
    padding: 15px 30px;
    box-shadow: ${props => props.boxShadow || "none"};
    width: ${props => props.width || "100%"};
    margin-left: auto;
    margin-right: auto;
`

export default Container
