import styled from "styled-components"
import Button from "../atoms/Button/Button"
import React from "react"
import { Component } from "react"
import { Field, reduxForm } from "redux-form"
import LabelInput from "../molecules/LabelInput"
import { required } from "../../modules/validation"
import theme from "./../../theme.json"

const StyledButton = styled(Button)`
    margin-top: 7vh;
    margin-left: 20%;
`

const TitleContainer = styled.div`
    text-align: center;
`

const AuthentificationContainer = styled.div`
    margin-top: 8vh;
    height: 15vh;
`

class ConnectionForm extends Component {
    render() {
        return (
            <form onSubmit={this.props.handleSubmit}>
                <TitleContainer>
                    <h1>Connexion</h1>
                </TitleContainer>
                <AuthentificationContainer>
                    <Field
                        name="username"
                        component={LabelInput}
                        type="text"
                        label="Pseudo *"
                        placeholder="Pseudo"
                        validate={[required]}
                    />

                    <Field
                        name="password"
                        component={LabelInput}
                        type="password"
                        label="Mot de passe *"
                        validate={[required]}
                    />
                </AuthentificationContainer>
                <StyledButton
                    children="Se connecter"
                    bgColor={theme.color.brown2}
                />
            </form>
        )
    }
}

ConnectionForm = reduxForm({
    form: "connection"
})(ConnectionForm)

export default ConnectionForm
