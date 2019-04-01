import styled from "styled-components";
import React from 'react';
import { login } from '../../modules/auth';
import Button from "../atoms/Button/Button";
import {Fragment, Component} from 'react';
import theme from "./../../theme.json";
import { Field, reduxForm } from "redux-form"
import FieldConnection from "../atoms/FieldConnection"
import { required } from "../../modules/validation"

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
                        component={FieldConnection}
                        type="text"
                        label="Pseudo *"
                        placeholder="Pseudo"
                        validate={[required]}
                    />

                    <Field
                        name="password"
                        component={FieldConnection}
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
        );
    }
}

ConnectionForm = reduxForm({
    form: "connection"
})(ConnectionForm)

export default ConnectionForm
