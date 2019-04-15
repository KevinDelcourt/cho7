import styled from "styled-components"
import React from "react"
import { connect } from "react-redux"

const MainTitle = styled.h1`
    font-size: ${props => props.size};
    font-family: ${props => props.font};
    color: ${props => props.color};
    text-align: center;
    margin-left: 5vw;
    margin-top: 1vh;
    display: inline-block;
`

const SiteTitle = props => (
    <MainTitle size={props.size} font={props.font} color={props.color}>
        {props.siteTitle}
    </MainTitle>
)

const mapStateToProps = state => {
    return {
        size: state.app.theme.fontSizeGrandTitre,
        font: state.app.theme.fontGrandTitre,
        color: state.app.theme.colorText,
        siteTitle: state.app.theme.siteTitle
    }
}

export default connect(mapStateToProps)(SiteTitle)
