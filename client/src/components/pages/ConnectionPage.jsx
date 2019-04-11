import React from "react"
import styled from "styled-components"
import logo from "./../../assets/images/logo.png"
import Logo from "../atoms/Logo"
import ConnectionForm from "./../organisms/ConnectionForm"
import { Link, Redirect } from "react-router-dom"
import { SubmissionError } from "redux-form"
import { login } from "../../modules/api"
import { connect } from "react-redux"
import { bindActionCreators } from "redux"
import { userLoginAction } from "../../modules/actionsAndReducers"

const ConnectionHeader = styled.div`
    width: 100vw;
    margin-top: 5vh;
    display: flex;
    justify-content: space-around;
`
const SiteTitle = styled.h1`
    font-size: ${props => props.size};
    font-family: ${props => props.font};
    color: ${props => props.color};
    text-align: center;
    margin-left: 5vw;
    margin-top: 1vh;
    display: inline-block;
`

class ConnectionPage extends React.Component {
    state = {}
    async componentDidMount() {
        document.title = "Connexion"
    }

    submit = async values => {
        if ((await login(values.username, values.password)) === true) {
            this.setState({ redirect: <Redirect to="/" /> }, () => {
                this.props.userLoginAction(true)
            })
        } else {
            throw new SubmissionError({
                username: "Erreur dans le login ou mot de passe",
                password: "Erreur dans le login ou mot de passe"
            })
        }
    }

    render = () => (
        <div>
            <Link to="/" title="Accueil">
                <ConnectionHeader>
                    <Logo src={logo} alt="logo" />
                    <SiteTitle
                        size={this.props.size}
                        font={this.props.font}
                        color={this.props.color}>
                        La Compagnie de l ' Aventure
                    </SiteTitle>
                </ConnectionHeader>
            </Link>
            <ConnectionForm onSubmit={this.submit} />
            {this.state.redirect}
        </div>
    )
}

const mapStateToProps = state => {
    return {
        size: state.app.theme.fontSizeGrandTitre,
        font: state.app.theme.fontGrandTitre,
        color: state.app.theme.colorText
    }
}

const mapDispatchToProps = dispatch => {
    return bindActionCreators({ userLoginAction }, dispatch)
}

export default connect(
    mapStateToProps,
    mapDispatchToProps
)(ConnectionPage)
