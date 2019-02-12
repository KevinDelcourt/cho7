import React from 'react';
import MenuButton from './../atoms/MenuButton';

import { logout, hasRole } from './../../modules/auth';
import { Link } from 'react-router-dom'

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
                <Link to='/'> <MenuButton children="Accueil" /> </Link>
                {!this.state.auth?<Link to="/login"> <MenuButton children="Connexion"/> </Link>:<span />}
                {this.state.auth?<Link to="/login" onClick={logout}> <MenuButton children="Déconnexion"/> </Link>:<span />}
                {this.state.auth?<Link to="/upload"> <MenuButton children="Upload"/> </Link>:<span />}
            </div>
        );
    }
}

export default BarreMenu