import styled from "styled-components";
import React from 'react';

const TitleConnectionContainer = styled.div`
    border: 2px dotted black;
    width: 15vw;
    height: 5vh;
    margin-left: 5vw;
    margin-top: 1vh;
    display: inline-block;
`;

const LabelPseudoContainer = styled.div`
    border: 2px dotted black;
    width: 10vw;
    height: 2.5vh;
    margin-left: 1.75vw;
    margin-top: 10vh;
    display: inline-block;
`;

const FieldPseudoContainer = styled.div`
    border: 2px dotted black;
    width: 10vw;
    height: 2.5vh;
    margin-left: 1vw;
    margin-top: 10vh;
    display: inline-block;
`;

const LabelPasswordContainer = styled.div`
    border: 2px dotted black;
    width: 10vw;
    height: 2.5vh;
    margin-left: 1.75vw;
    margin-top: 2vh;
    display: inline-block;
`;

const FieldPasswordContainer = styled.div`
    border: 2px dotted black;
    width: 10vw;
    height: 2.5vh;
    margin-left: 1vw;
    margin-top: 2vh;
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

const ConnectionForm = () => {
    return (
        <div>
            <TitleConnectionContainer>Titre connexion</TitleConnectionContainer>
            <LabelPseudoContainer>Label Pseudo</LabelPseudoContainer>
            <FieldPseudoContainer>Pseudo</FieldPseudoContainer>
            <LabelPasswordContainer>Label Mot de passe</LabelPasswordContainer>
            <FieldPasswordContainer>Mot de passe</FieldPasswordContainer>
            <LoginButtonContainer>Se connecter</LoginButtonContainer>
            <LabelForgottenPasswordContainer>Mot de passe oublié</LabelForgottenPasswordContainer>
        </div>
    );
};

export default ConnectionForm;