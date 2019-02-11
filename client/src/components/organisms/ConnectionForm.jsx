import styled from "styled-components";
import React from 'react';
import Authentification from "./../molecules/Authentification";
import { login } from '../../modules/auth';
import TitleConnection from "./../atoms/TitleConnection";


const TitleConnectionContainer = styled.div`
    text-align: center;
`;

const LoginButtonContainer = styled.div`
    border: 2px dotted black;
    width: 10vw;
    height: 5vh;
    margin-left: 7vw;
    margin-top: 12vh;
    display: inline-block;
`;

const LabelForgottenPasswordContainer = styled.div`
    border: 2px dotted black;
    width: 10vw;
    height: 2.5 vh;
    margin-left: 2vw;
    margin-top: 1vh;
    display: block;
`;

const AuthentificationContainer = styled.div`
    margin-top: 8vh;
    height: 15vh;
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

    render(){

        return (
            <div>
                <TitleConnectionContainer>
                    <TitleConnection children="Connexion"/>
                </TitleConnectionContainer>
                
                <AuthentificationContainer>
                    <Authentification setPassword={this.setPassword} setUsername={this.setUsername}/>
                </AuthentificationContainer>
    
                <LoginButtonContainer>
                    <button onClick={this.connect}>Se connecter</button>
                </LoginButtonContainer>
                <LabelForgottenPasswordContainer>Mot de passe oublié</LabelForgottenPasswordContainer>
            </div>
        )
    }
}


export default ConnectionForm;