import styled from "styled-components"
import React from "react"
import theme from "./../../theme.json"

const Container = styled.div`
    background-color: ${props => props.bgColor || "none"};
    border-radius: ${props => props.borderRadius};
    border: ${props => props.border};
    padding: 15px 30px;
`

class MainContainer extends React.Component {
    render() {
        return (
            <Container
                bgColor={theme.colors.mainContainer}
                borderRadius={theme.border.mainContainerCorners}
                border={theme.border.mainContainer}>
                <h2>{this.props.title}</h2>
                {this.props.children}
            </Container>
        )
    }
}

export default MainContainer
