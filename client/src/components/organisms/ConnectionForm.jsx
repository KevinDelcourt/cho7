import styled from "styled-components";
import React from 'react';
import Authentification from "./../molecules/Authentification";

const TitleConnectionContainer = styled.div`
    border: 2px dotted black;
    width: 15vw;
    height: 5vh;
    margin-left: 5vw;
    margin-top: 1vh;
    display: inline-block;
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

const ConnectionForm = () => {
    return (
        <div>
            <TitleConnectionContainer>Titre connexion</TitleConnectionContainer>
            
            <AuthentificationContainer>
                <Authentification />
            </AuthentificationContainer>

            <LoginButtonContainer>Se connecter</LoginButtonContainer>
            <LabelForgottenPasswordContainer>Mot de passe oublié</LabelForgottenPasswordContainer>
        </div>
    );
};

export default ConnectionForm;