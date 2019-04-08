import React from "react"
import styled from "styled-components"

const Title = styled.h2`
    font-size: ${props => props.size};
    font-family: ${props => props.font};
    color: ${props => props.color};
    margin-bottom: 30px;
`

const Container = styled.div`
    background-color: ${props => props.bgColor || "rgba(145, 109, 67, 0.35)"};
    border-radius: ${props => props.borderRadius || "20px"};
    padding: 15px 30px;
    box-shadow: ${props => props.boxShadow || "none"};
    width: ${props => props.width || "100%"};
    margin-left: auto;
    margin-right: auto;
`

const MainContainer = props => {
    return (
        <Container
            bgColor={props.bgColor}
            boxShadow={props.boxShadow}
            width={props.width}
            borderRadius={props.borderRadius}>
            <Title
                size={props.fontSize}
                font={props.font}
                color={props.color}
                children={props.title}
            />
            {props.children}
        </Container>
    )
}

export default MainContainer
