import React from 'react';
import MenuButton from './../atoms/MenuButton';

import { logout, hasRole } from './../../modules/auth';

const styleBarreMenu = {
    background: 'rgba(213, 191, 159, 0.67)',
    borderRadius: '20px',
    paddingTop: '1vh',
    paddingLeft: '2vw',
    paddingBottom: '1vh',
};

class BarreMenu extends React.Component {
    state={
		auth:false
    }

    async componentDidMount() {
		this.setState({auth:await hasRole("CREATEUR")})
	}
    
    render(){
        return(
            <div style={styleBarreMenu}>
                <a href='/'> <MenuButton children="Accueil" /> </a>
                {!this.state.auth?<a href="/login"> <MenuButton children="Connexion"/> </a>:<span />}
                {this.state.auth?<a href="/login" onClick={logout}> <MenuButton children="Déconnexion"/> </a>:<span />}
                {this.state.auth?<a href="/upload"> <MenuButton children="Upload"/> </a>:<span />}
            </div>
        );
    }
}

export default BarreMenu