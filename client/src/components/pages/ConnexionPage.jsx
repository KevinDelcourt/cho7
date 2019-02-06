import styled from "styled-components";
import logo from './../../assets/images/logo.png';
import Logo from '../atoms/Logo';
import React from 'react';

const LogoContainer = styled.div`
    width: 126px;
    height: 126px;
    margin-left: ${props => props.left}vw;
    margin-top: ${props => props.top}vh;
    display: inline-block;
`;

const Container = styled.div`
    border: 2px dotted black;
    width: ${props => props.w}vw;
    height: ${props => props.h}vh;
    margin-left: ${props => props.left}vw;
    margin-top: ${props => props.top}vh;
    display: inline-block;
`;

const ConnexionPage = () => {
    return (
        <div>
            <LogoContainer left="5" top="1">
                <Logo src={logo} alt="logo" />
            </LogoContainer>
            <Container w="30" h="5" left="45" top="2"> Titre </Container>  
            <Container w="25" h="50" left="35" top="10">
                <Container w="15" h="5" left="5" top="1"> Titre connexion </Container>
                <Container w="20" h="2.5" left="2" top="10">Zone Pseudo</Container>
                <Container w="20" h="2.5" left="2" top="2">Zone Mdp</Container>
                <Container w="10" h="3" left="7" top="5">Bouton Connexion</Container>
                <Container w="7" h="2.5" left="4" top="6">Mdp oublié</Container>
            </Container>
        </div>
    );
};

export default ConnexionPage;
