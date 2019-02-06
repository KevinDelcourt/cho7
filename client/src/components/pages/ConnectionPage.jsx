import React from 'react';
import styled from "styled-components";
import logo from './../../assets/images/logo.png';
import Logo from '../atoms/Logo';
import ConnectionForm from './../organisms/ConnectionForm';
import SiteTitle from './../atoms/SiteTitle';

const LogoContainer = styled.div`
    width: 126px;
    height: 126px;
    margin-left: 5vw;
    margin-top: 1vh;
    display: inline-block;
`;

const SiteTitleContainer = styled.div`
    border: 2px dotted black;
    width: 30vw;
    height: 5vh;
    margin-left: 45vw;
    margin-top: 2vh;
    display: inline-block;
`;

const ConnectionFormContainer = styled.div`
    border: 2px dotted black;
    width: 25vw;
    height: 50vh;
    margin-left: 35vw;
    margin-top: 10vh;
    display: inline-block;
`;

const ConnexionPage = () => {
    return (
        <div>
            <LogoContainer>
                <Logo src={logo} alt="logo" />
            </LogoContainer>
            <SiteTitleContainer>
                <SiteTitle>La Compagnie de l'Aventure</SiteTitle>
            </SiteTitleContainer>  
            <ConnectionFormContainer>   
                <ConnectionForm />
            </ConnectionFormContainer>
        </div>
    );
};

export default ConnexionPage;
