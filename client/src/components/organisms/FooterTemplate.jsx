import styled from "styled-components"
import React, { Component } from "react"
import LightContainer from "../atoms/Container/LightContainer"
import Link from "../atoms/Link/Link"

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
                    <Link to="/">La Compagnie de l'Aventure</Link>
                    <Link to="/about">À propos</Link>
                </FooterContainer>
            </LightContainer>
        )
    }
}
