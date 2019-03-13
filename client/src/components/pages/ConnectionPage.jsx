import React from 'react';
import styled from "styled-components";
import logo from './../../assets/images/logo.png';
import Logo from '../atoms/Logo';
import ConnectionForm from './../organisms/ConnectionForm';
import SiteTitle from '../atoms/SiteTitle';
import { hasRole } from '../../modules/auth';
import { Link } from 'react-router-dom';

const ConnectionFormContainer = styled.div`
    width: 28vw;
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

    async componentDidMount() {
        document.title = "Connexion";
        this.setState({auth:await hasRole("CREATEUR")})
    }

    render(){
        if(this.state.auth)
            window.location="/"
            
        return (
            <div>
                <Link to="/" title="Accueil">
                    <ConnectionHeader>
                        <Logo src={logo} alt="logo" />
                        <SiteTitle children="La Compagnie de l ' Aventure" />
                    </ConnectionHeader>
                </Link>
                <ConnectionFormContainer>   
                    <ConnectionForm />
                </ConnectionFormContainer>
            </div>
        )
    }
}



export default ConnectionPage;
