import styled from "styled-components"
import React from "react"
import theme from "./../../theme.json"

const Container = styled.div`
    background-color: ${props => props.bgColor || "none"};
    border-radius: 20px;
    padding: 15px 30px;
`

class MainContainer extends React.Component {
    render() {
        return (
            <Container bgColor={theme.color.brown1}>
                <h2>{this.props.title}</h2>
                {this.props.children}
            </Container>
        )
    }
}

export default MainContainer
