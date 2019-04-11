import styled from "styled-components"
import React, { Component } from "react"
import LightContainer from "../atoms/Container/LightContainer"

const FooterContainer = styled.div`
    width: 100%;
    display: flex;
    justify-content: space-around;
    align-items: center;
`

export default class FooterTemplate extends Component {
    render() {
        return (
            <LightContainer>
                <FooterContainer>
                    <a href="/">La Compagnie de l'Aventure</a>
                    <a href="/about">À propos</a>
                </FooterContainer>
            </LightContainer>
        )
    }
}
