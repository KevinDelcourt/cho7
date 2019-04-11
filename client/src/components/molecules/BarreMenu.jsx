import styled from "styled-components"
import React from "react"
import StyledButton from "../atoms/Button/Button"
import { Link } from "react-router-dom"
import theme from "./../../theme.json"
import { connect } from "react-redux"
import LightContainer from "../atoms/Container/LightContainer"
const NavBarContainer = styled.div`
    background: rgba(213, 191, 159, 0.67);
    border-radius: 5px;
    padding: 5px 1vw;
    display: flex;
    justify-content: space-between;
    margin: 0 2vw;
`

/*const StyledButton = styled(Button)`
    margin-left: 0.5vw;
    background-color: ${theme.btnColor};
    height: 6vh;
    min-height: 43px;
`*/

class BarreMenu extends React.Component {
    render() {
        let co
        let creations
        let profil

        if (!this.props.role_createur) {
            co = (
                <Link to="/login" style={{ marginRight: "1vw" }}>
                    {" "}
                    <StyledButton children="Connexion" />{" "}
                </Link>
            )
        } else {
            co = (
                <Link to="/logout">
                    {" "}
                    <StyledButton children="Déconnexion" />{" "}
                </Link>
            )
            profil = (
                <Link to="/RenseignerProfilPage">
                    {" "}
                    <StyledButton children="Profil" />{" "}
                </Link>
            )
        }

        if (this.props.role_createur) {
            creations = (
                <Link to="/creations">
                    <StyledButton children="Mes créations" />
                </Link>
            )
        }

        return (
            <LightContainer>
                <div>
                    <Link to="/">
                        <StyledButton children="Accueil" />
                    </Link>
                    {creations}
                </div>

                <div>
                    {profil}
                    {co}
                </div>
            </LightContainer>
        )
    }
}

const mapStateToProps = state => {
    return {
        role_createur: state.app.role_createur
    }
}

export default connect(mapStateToProps)(BarreMenu)
