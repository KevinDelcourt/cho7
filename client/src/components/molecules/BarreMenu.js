import styled from 'styled-components';
import React from 'react';
import MenuButton from '../atoms/MenuButton';
import { logout, hasRole } from '../../modules/auth';
import { Link } from 'react-router-dom'

const NavBarContainer = styled.div`
    background: rgba(213, 191, 159, 0.67);
    border-radius: 10px;
    padding: 1vh 1vw 1vh 0.5vw;

    display: flex;
    justify-content: space-between;
    height: 8vh;
    align-items: center;
    width: 94vw;
    margin-right: auto;
    margin-left: auto;
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
            co = <a href="/" onClick={logout}> <MenuButton children="Déconnexion"/> </a>
            profil= <Link to="/RenseignerProfilPage" > <MenuButton children="Profil"/> </Link>

        }   

        if (this.state.auth) {
            upload = <Link to="/Creation"> <MenuButton children="Creation" /></Link>;
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