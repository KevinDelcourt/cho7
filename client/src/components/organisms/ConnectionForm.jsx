import styled from "styled-components"
import Button from "../atoms/Button/Button"
import React from "react"
import { Component } from "react"
import { Field, reduxForm } from "redux-form"
import LabelInput from "../molecules/LabelInput"
import { required } from "../../modules/validation"
import theme from "./../../theme.json"
import Container from "../atoms/Container/Container"
import Title from "../atoms/Title/Title"

const StyledButton = styled(Button)`
    display: block;
    margin: 20px auto;
    background-color: #916d43;
    border: none;
    border-radius: 10px;
    color: black;
`

const StyledTitle = styled(Title)`
    text-align: center;
`

const StyledContainer = styled(Container)`
    background-color: #eaeaea;
    width: 28vw;
    box-shadow: 0px 4px 15px rgba(0, 0, 0, 0.25);
    border: none;
    border-radius: 0px;
`

class ConnectionForm extends Component {
    render() {
        return (
            <StyledContainer>
                <StyledTitle size="50px" children="Connexion" />
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
            </StyledContainer>
        )
    }
}

ConnectionForm = reduxForm({
    form: "connection"
})(ConnectionForm)

export default ConnectionForm
