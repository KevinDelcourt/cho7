import styled from "styled-components";
import React from 'react';
import Authentification from "./../molecules/Authentification";
import { login } from '../../modules/auth';
import Button from "../atoms/Button/Button";
import {Fragment, Component} from 'react';
import theme from "./../../theme.json";

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

    render() {
        let labelErrCo = "";
        if(this.state.errCo){
            labelErrCo = <div><label>Erreur du pseudo ou mot de passe !</label></div>
        }
        return (
            <Fragment>
                <TitleContainer>
                    <h1>Connexion</h1>
                </TitleContainer>
                <AuthentificationContainer>
                    <Authentification setPassword={this.setPassword} setUsername={this.setUsername}/>
                </AuthentificationContainer>
                <StyledButton onClick={this.connect} children="Se connecter" bgColor={theme.color.brown2}></StyledButton>
                {labelErrCo}
            </Fragment>
        );
    }
}
export default ConnectionForm;