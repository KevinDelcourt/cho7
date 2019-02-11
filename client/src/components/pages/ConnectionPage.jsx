import React from 'react';
import styled from "styled-components";
import logo from './../../assets/images/logo.png';
import Logo from '../atoms/Logo';
import ConnectionForm from './../organisms/ConnectionForm';
import SiteTitle from '../atoms/SiteTitle';
import { hasRole } from '../../modules/auth';


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

class ConnectionPage extends React.Component {
    state={auth:false}

    async componentDidMount(){
        document.title = "Connexion";
        this.setState({auth:await hasRole("CREATEUR")})
    }

    render(){
        if(this.state.auth)
            window.location="/"
            
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
        )
    }
}



export default ConnectionPage;
