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
    background-color: rgb(145, 109, 67);
    border: none;
    border-radius: 10px;
    color: black;
`

const StyledTitle = styled(Title)`
    text-align: center;
`

const FormContainer = styled(Container)`
    min-width: 300px;
    background-color: #eaeaea;
    box-shadow: 0px 4px 15px rgba(0, 0, 0, 0.25);
    border: none;
    border-radius: 0px;
`

class ConnectionForm extends Component {
    render() {
        return (
            <FormContainer width="28vw">
                <StyledTitle size="41px" children="Connexion" />
                <form onSubmit={this.props.handleSubmit}>
                    <Field
                        dataCypress="field1"
                        name="username"
                        component={LabelInput}
                        type="text"
                        label="Pseudo *"
                        placeholder="Pseudo"
                        validate={[required]}
                    />
                    <Field
                        dataCypress="field2"
                        name="password"
                        component={LabelInput}
                        type="password"
                        label="Mot de passe *"
                        validate={[required]}
                    />
                    <StyledButton
                        data-cypress="submit"
                        children="Se connecter"
                    />
                </form>
            </FormContainer>
        )
    }
}

ConnectionForm = reduxForm({
    form: "connection"
})(ConnectionForm)

export default ConnectionForm
