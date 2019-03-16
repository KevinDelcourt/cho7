import styled from "styled-components";
import React from 'react';
import { login } from '../../modules/api';
import Button from "../atoms/Button";
import { Component} from 'react';
import theme from "./../../theme.json";
import { Field, reduxForm } from 'redux-form'
import FieldConnection from "../atoms/FieldConnection";
import { required } from "../../modules/validation"

const StyledButton = styled(Button)`
    margin-top: 7vh;
    margin-left: 20%;`;

const TitleContainer = styled.div`
	text-align: center;
`;

const AuthentificationContainer = styled.div`
    margin-top: 8vh;
    height: 15vh;
`;

class ConnectionForm extends Component {
    state = {
    	username:"",
        password:"",
        errCo: false
    }

    setPassword = (password) => this.setState({password:password})
    setUsername = (username) => this.setState({username:username})

    connect = async()=>{
        if(await login(this.state.username,this.state.password))
            window.location="/"
        else{
            console.log("oh no")
            this.setState({errCo: true})
        }
    }
    //<Authentification setPassword={this.setPassword} setUsername={this.setUsername}/>
    render() {
        let labelErrCo = "";
        if(this.state.errCo){
            labelErrCo = <div><label>Erreur du pseudo ou mot de passe !</label></div>
        }
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
                <StyledButton children="Se connecter" bgColor={theme.connectionButton}></StyledButton>
                {labelErrCo}
            </form>
        );
    }
}

ConnectionForm = reduxForm({
    form: "connection"
})(ConnectionForm)

export default ConnectionForm;