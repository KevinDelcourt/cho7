import styled from "styled-components";
import React, {Component} from 'react';
import Authentification from "./../molecules/Authentification";
import ConnectionButton from "./../atoms/ConnectionButton";
import { login } from '../../modules/auth';
import TitleConnection from "./../atoms/TitleConnection";

const TitleConnectionContainer = styled.div`
	text-align: center;
`;

const AuthentificationContainer = styled.div`
    margin-top: 8vh;
    height: 15vh;
`;

const FooterConnection = styled.div`
    display: flex;
    flex-direction: column;
    margin-top: 15vh;
`;


class ConnectionForm extends React.Component {
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
            <div>
                <TitleConnectionContainer>
                    <TitleConnection children="Connexion" />
                </TitleConnectionContainer>
                
                <AuthentificationContainer>
                    <Authentification setPassword={this.setPassword} setUsername={this.setUsername}/>
                </AuthentificationContainer>
                
                <FooterConnection>
                    <ConnectionButton onClick={this.connect}>Se connecter</ConnectionButton>
                </FooterConnection>
            </div>
        );
    }
}
export default ConnectionForm;