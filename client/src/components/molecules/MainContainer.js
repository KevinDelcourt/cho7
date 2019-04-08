import React from "react"
import Container from "../atoms/Container/Container"

const MainContainer = props => {
    return (
        <Container
            bgColor={props.bgColor}
            boxShadow={props.boxShadow}
            width={props.width}
            borderRadius={props.borderRadius}>
            <h2>{props.title}</h2>
            {props.children}
        </Container>
    )
}

export default MainContainer
