import styled from "styled-components";
import React from 'react';
import Authentification from "./../molecules/Authentification";
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

const ConnectionForm = () => {
    return (
        <div>
            <TitleConnectionContainer>
                <TitleConnection children="Connexion" />
            </TitleConnectionContainer>
            
            <AuthentificationContainer>
                <Authentification />
            </AuthentificationContainer>

            <LoginButtonContainer children="Se connecter" />
            <LabelForgottenPasswordContainer children="Mot de passe oublié" />
        </div>
    );
};

export default ConnectionForm;