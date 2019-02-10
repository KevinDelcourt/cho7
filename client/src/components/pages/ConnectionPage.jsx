import React from 'react';
import styled from "styled-components";
import logo from './../../assets/images/logo.png';
import Logo from '../atoms/Logo';
import ConnectionForm from './../organisms/ConnectionForm';
import SiteTitle from '../atoms/SiteTitle';
import { hasRole } from '../../modules/auth';

const ConnectionFormContainer = styled.div`
    border: 2px dotted black;
    width: 26vw;
    height: 60vh;
    margin-left: auto;
    margin-right: auto;
    padding: 6vh 4vw;
`;

const ConnectionHeader = styled.div`
    width: 100vw;
    height: 25vh;
    margin-top: 5vh;
    display: flex;
    justify-content: space-around;
`;


class ConnectionPage extends React.Component {
    state={auth:false}

    async componentDidMount(){
        this.setState({auth:await hasRole("CREATEUR")})
    }

    render(){
        if(this.state.auth)
            window.location="/"
            
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
        )
    }
}

export default ConnectionPage;
