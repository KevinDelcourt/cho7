import styled from "styled-components"
import React from "react"
import { getImageUrl } from "../../modules/apiURL"
import { connect } from "react-redux"

const Logo = styled.img`
    width: 126px;
    height: 126px;
    display: flex;
`

const ALogo = props => (
    <Logo
        src={
            props.logoFile
                ? URL.createObjectURL(props.logoFile)
                : getImageUrl(props.logo)
        }
        alt="logo"
    />
)

const mapStateToProps = state => {
    return {
        logo: state.app.theme.logo,
        logoFile: state.app.theme.logoFile
    }
}

export default connect(mapStateToProps)(ALogo)
