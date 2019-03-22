import styled from 'styled-components';
import React from 'react';
import Button from '../atoms/Button';
import { logout, hasRole } from '../../modules/auth';
import { Link } from 'react-router-dom';
import theme from "./../../theme.json";


const NavBarContainer = styled.div`
    background: rgba(213, 191, 159, 0.67);
    border-radius: 5px;
    padding: 5px 1vw;
    display: flex;
    justify-content: space-between;
    margin: 0 2vw;
`;

const StyledButton = styled(Button)`
    margin-left: 0.5vw;
    background-color:${theme.bgColor.menuButton}
    height: 6vh;
    min-height: 43px;
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
        let creations;
        let profil;

        if (!this.state.auth) {
            co =  <Link to="/login" style={{marginRight: '1vw'}}> <StyledButton children="Connexion"/> </Link>;
        }
        else {
            co = <a href="/" onClick={logout}> <StyledButton children="Déconnexion"/> </a>
            profil= <Link to="/RenseignerProfilPage" > <StyledButton children="Profil"/> </Link>

        }   

        if (this.state.auth) {
            creations = <Link to="/creations"><StyledButton children="Mes créations" /></Link>;
        }

        return(
            <NavBarContainer>
                <div>
                    <Link to='/'><StyledButton children="Accueil" /></Link>
                    {creations}
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