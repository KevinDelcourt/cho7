import React from "react"
import Container from "../atoms/Container/Container"
import Title from "../atoms/Title/Title"

const MainContainer = props => {
    return (
        <Container
            bgColor={props.bgColor}
            boxShadow={props.boxShadow}
            width={props.width}
            borderRadius={props.borderRadius}>
            <Title
                font={props.font}
                children={props.title}
                data-cypress={props.dataCypressTitle}
            />
            {props.children}
        </Container>
    )
}

export default MainContainer
