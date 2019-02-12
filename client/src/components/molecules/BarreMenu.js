import React from 'react';
import MenuButton from '../atoms/MenuButton';

import { logout, hasRole } from '../../modules/auth';
import { Link } from 'react-router-dom'

const styleBarreMenu = {
    background: 'rgba(213, 191, 159, 0.67)',
    borderRadius: '20px',
    paddingTop: '1vh',
    paddingLeft: '2vw',
    paddingBottom: '1vh',
    display: 'flex',
    justifyContent: 'space-between',
    height: '5vh',
    alignItems: 'center',
    width: '95vw',
    marginRight: 'auto',
    marginLeft: 'auto',
};


class BarreMenu extends React.Component {
    state={
		auth:false
    }

    async componentDidMount() {
		this.setState({auth:await hasRole("CREATEUR")})
    }
    
    render(){
        let co;
        let upload;

        if (!this.state.auth) {
            co =  <Link to="/login" style={{marginRight: '1vw'}}> <MenuButton children="Connexion"/> </Link>;
        }
        else {
            co = <Link to="/login" onClick={logout} style={{marginRight: '1vw'}}> <MenuButton children="Déconnexion"/> </Link>
        }   

        if (this.state.auth) {
            upload = <Link to="/upload"> <MenuButton children="Upload" /></Link>;
        }

        return(
            <div style={styleBarreMenu}>
                <div>
                    <Link to='/'> <MenuButton children="Accueil" /> </Link>
                    {upload}
                </div>
                {co}
            </div>
        );
    }
}

export default BarreMenu;