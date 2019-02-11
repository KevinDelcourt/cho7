import styled from "styled-components";
import React, {Component} from 'react';
import Authentification from "./../molecules/Authentification";
import ForgottenPassword from "./../atoms/ForgottenPassword";
import ConnectionButton from "./../atoms/ConnectionButton";

const TitleConnectionContainer = styled.div`
    border: 2px dotted black;
    width: 15vw;
    height: 5vh;
    margin-left: 5vw;
    margin-top: 1vh;
    display: inline-block;
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


class ConnectionForm extends Component {
    constructor(props){
        super(props);
        this.userLogin = '';
        this.userPwd = '';
    }

    getUserProperties(){
        
    }

    render() {
        return (
            <div>
                <TitleConnectionContainer>Titre connexion</TitleConnectionContainer>
                
                <AuthentificationContainer>
                    <Authentification />
                </AuthentificationContainer>
                
                <FooterConnection>
                    <ConnectionButton children="Se Connecter" />
                    <ForgottenPassword>Mot de passe oublié</ForgottenPassword>
                </FooterConnection>
            </div>
        );
    }
};

export default ConnectionForm;