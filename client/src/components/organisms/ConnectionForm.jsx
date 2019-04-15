import styled from "styled-components"
import Button from "../atoms/Button/Button"
import React from "react"
import { Component } from "react"
import { Field, reduxForm } from "redux-form"
import LabelInput from "../molecules/LabelInput"
import { required } from "../../modules/validation"
import Container from "../atoms/Container/Container"
import Title from "../atoms/Title/Title"

const StyledButton = styled(Button)`
    display: block;
    margin: 20px auto;
    font-size: 18px;
    font-family: "Almendra SC", Ruluko, Arial, Sans-serif;
    background-color: #916d43;
    border: none;
    border-radius: 10px;
    color: black;
`

const StyledTitle = styled(Title)`
    text-align: center;
`

const FormContainer = styled(Container)`
    min-width: 300px;
`

class ConnectionForm extends Component {
    render() {
        return (
            <FormContainer width="28vw" borderRadius="0px">
                <StyledTitle size="41px" children="Connexion" />
                <form onSubmit={this.props.handleSubmit}>
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
                    <StyledButton children="Se connecter" />
                </form>
            </FormContainer>
        )
    }
}

ConnectionForm = reduxForm({
    form: "connection"
})(ConnectionForm)

export default ConnectionForm
