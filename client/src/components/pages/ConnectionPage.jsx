import React from "react"
import styled from "styled-components"
import Logo from "../atoms/Logo"
import ConnectionForm from "./../organisms/ConnectionForm"
import { Link, Redirect } from "react-router-dom"
import { SubmissionError } from "redux-form"
import { login } from "../../modules/api"
import { connect } from "react-redux"
import { bindActionCreators } from "redux"
import { userLoginAction } from "../../modules/actionsAndReducers"
import SiteTitle from "./../atoms/Title/SiteTitle"

const ConnectionHeader = styled.div`
    width: 100vw;
    margin-top: 5vh;
    display: flex;
    justify-content: space-around;
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
                username: "Erreur dans le login ou mot de passe"
            })
        }
    }

    render = () => (
        <div>
            <Link to="/" title="Accueil">
                <ConnectionHeader>
                    <Logo />
                    <SiteTitle />
                </ConnectionHeader>
            </Link>
            <ConnectionForm onSubmit={this.submit} />
            {this.state.redirect}
        </div>
    )
}

const mapDispatchToProps = dispatch => {
    return bindActionCreators({ userLoginAction }, dispatch)
}

export default connect(
    null,
    mapDispatchToProps
)(ConnectionPage)
