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
    width: 26vw;
    height: 60vh;
    margin-left: auto;
    margin-right: auto;
    padding: 6vh 4vw;
`;

const ConnectionPage = () => {
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

export default ConnectionPage;
