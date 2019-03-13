import styled from "styled-components";
import React from 'react';
import Authentification from "./../molecules/Authentification";
import { login } from '../../modules/auth';
import Button from "../atoms/Button";
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
    }

    setPassword = (password) => this.setState({password:password})
    setUsername = (username) => this.setState({username:username})

    connect = async()=>{
        if(await login(this.state.username,this.state.password))
            window.location="/"
        else
            console.log("oh no")
    }

    render() {
        return (
            <Fragment>
                <TitleContainer>
                    <h1>Connexion</h1>
                </TitleContainer>
                <AuthentificationContainer>
                    <Authentification setPassword={this.setPassword} setUsername={this.setUsername}/>
                </AuthentificationContainer>
                <StyledButton onClick={this.connect} children="Se connecter" bgColor={theme.bgColor.connectionButton}></StyledButton>
            </Fragment>
        );
    }
}
export default ConnectionForm;