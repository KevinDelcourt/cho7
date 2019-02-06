import React from 'react';
import styled from "styled-components";
import logo from './../../assets/images/logo.png';
import Logo from '../atoms/Logo';
import ConnectionForm from './../organisms/ConnectionForm';
import SiteTitle from '../atoms/SiteTitle';

const ConnectionFormContainer = styled.div`
    border: 2px dotted black;
    width: 25vw;
    height: 50vh;
    margin-left: 35vw;
    margin-top: 10vh;
    display: inline-block;
`;

const ConnectionHeader = styled.div`
    width: 100vw;
    height: 25vh;
    margin-top: 5vh;
    display: flex;
    justify-content: space-around;
`;

const ConnectionPage = () => {
    return (
        <div>
            <ConnectionHeader>
                <Logo src={logo} alt="logo" />
                <SiteTitle>La Compagnie de l ' Aventure</SiteTitle> 
            </ConnectionHeader> 
            <ConnectionFormContainer>   
                <ConnectionForm />
            </ConnectionFormContainer>
        </div>
    );
};

export default ConnectionPage;
