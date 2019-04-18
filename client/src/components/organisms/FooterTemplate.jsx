import styled from "styled-components"
import React, { Component } from "react"
import LightContainer from "../atoms/Container/LightContainer"
import Link from "../atoms/Link/Link"
import { connect } from "react-redux"

const FooterContainer = styled.div`
    width: 100%;
    display: flex;
    justify-content: space-around;
    align-items: center;
    padding: 10px;
`

class FooterTemplate extends Component {
    render() {
        return (
            <LightContainer>
                <FooterContainer>
                    <Link to="/">{this.props.siteTitle}</Link>
                    <Link to="/about">À propos</Link>
                </FooterContainer>
            </LightContainer>
        )
    }
}

const mapStateToProps = state => {
    return {
        siteTitle: state.app.theme.siteTitle
    }
}

export default connect(mapStateToProps)(FooterTemplate)
