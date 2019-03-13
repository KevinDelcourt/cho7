import styled from 'styled-components';
import React from 'react';
import MenuButton from '../atoms/Button';
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
const StyledMenuButton = styled(MenuButton)`
    margin-left: 0.5vw;
    background-color: rgba(145, 109, 67, 0.35);
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
            co =  <Link to="/login" style={{marginRight: '1vw'}}> <StyledMenuButton children="Connexion"/> </Link>;
        }
        else {
            co = <Link to="/login" onClick={logout}> <StyledMenuButton children="Déconnexion"/> </Link>
            profil= <Link to="/RenseignerProfilPage" > <StyledMenuButton children="Profil"/> </Link>

        }   

        if (this.state.auth) {
            upload = <Link to="/upload"> <StyledMenuButton children="Upload" /></Link>;
        }

        return(
            <NavBarContainer>
                <div>
                    <Link to='/'> <StyledMenuButton children="Accueil" /> </Link>
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