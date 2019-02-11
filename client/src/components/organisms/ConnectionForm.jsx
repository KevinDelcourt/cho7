import styled from "styled-components";
import React, {Component} from 'react';
import Authentification from "./../molecules/Authentification";
import ForgottenPassword from "./../atoms/ForgottenPassword";
import ConnectionButton from "./../atoms/ConnectionButton";
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
                <TitleConnectionContainer>
                    <TitleConnection children="Connexion" />
                </TitleConnectionContainer>
                
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
}
export default ConnectionForm;