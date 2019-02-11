import React from 'react';
import styled from "styled-components";
import logo from './../../assets/images/logo.png';
import Logo from '../atoms/Logo';
import ConnectionForm from './../organisms/ConnectionForm';
import SiteTitle from '../atoms/SiteTitle';

const ConnectionFormContainer = styled.div`
    width: 26vw;
    height: 60vh;
    margin-left: auto;
    margin-right: auto;
    padding: 6vh 4vw;
    background: #EAEAEA;
    box-shadow: 0px 4px 15px rgba(0, 0, 0, 0.25);
`;

const ConnectionHeader = styled.div`
    width: 100vw;
    margin-top: 5vh;
    display: flex;
    justify-content: space-around;
`;

const ConnectionPage = () => {
    return (
        <div>
            <ConnectionHeader>
                <Logo src={logo} alt="logo" />
                <SiteTitle children="La Compagnie de l ' Aventure" />
            </ConnectionHeader> 
            <ConnectionFormContainer>   
                <ConnectionForm />
            </ConnectionFormContainer>
        </div>
    );
};

export default ConnectionPage;
