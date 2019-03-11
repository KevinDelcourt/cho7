import styled from 'styled-components';
import React from 'react';
import MenuButton from '../atoms/MenuButton';
import { logout, hasRole } from '../../modules/auth';
import { Link } from 'react-router-dom'

const NavBarContainer = styled.div`
    background: rgba(213, 191, 159, 0.67);
    border-radius: 5px;
    padding: 5px 1vw;
    display: flex;
    justify-content: space-between;
    margin: 0 2vw;
    `;

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
        let profil;

        if (!this.state.auth) {
            co =  <Link to="/login" style={{marginRight: '1vw'}}> <MenuButton children="Connexion"/> </Link>;
        }
        else {
            co = <Link to="/login" onClick={logout}> <MenuButton children="Déconnexion"/> </Link>
            profil= <Link to="/RenseignerProfilPage" > <MenuButton children="Profil"/> </Link>

        }   

        if (this.state.auth) {
            upload = <Link to="/upload"> <MenuButton children="Upload" /></Link>;
        }

        return(
            <NavBarContainer>
                <div>
                    <Link to='/'> <MenuButton children="Accueil" /> </Link>
                    {upload}
                </div>

                <div> 
                    {profil}
                    {co}
                </div>
            </NavBarContainer>
        );
    }
}

export default BarreMenu;