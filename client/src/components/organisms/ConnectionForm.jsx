import styled from "styled-components"
import Button from "../atoms/Button/Button"
import React from "react"
import { Component } from "react"
import { Field, reduxForm } from "redux-form"
import LabelInput from "../molecules/LabelInput"
import { required } from "../../modules/validation"
import theme from "./../../theme.json"
import MainContainer from "../molecules/MainContainer"

const StyledConnectionForm = styled.form``

const StyledButton = styled(Button)`
    display: block;
    margin: 30px auto;
`

class ConnectionForm extends Component {
    render() {
        return (
            <MainContainer
                title="Connexion"
                bgColor={theme.color.grey2}
                boxShadow="0px 4px 15px rgba(0, 0, 0, 0.25)"
                width="28vw"
                borderRadius="0px"
                fontSize="50px">
                <StyledConnectionForm onSubmit={this.props.handleSubmit}>
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
                    <StyledButton
                        children="Se connecter"
                        bgColor={theme.color.brown2}
                    />
                </StyledConnectionForm>
            </MainContainer>
        )
    }
}

ConnectionForm = reduxForm({
    form: "connection"
})(ConnectionForm)

export default ConnectionForm
