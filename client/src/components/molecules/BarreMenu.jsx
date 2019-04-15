import React from "react"
import StyledButton from "../atoms/Button/Button"
import { Link } from "react-router-dom"
import { connect } from "react-redux"
import LightContainer from "../atoms/Container/LightContainer"

class BarreMenu extends React.Component {
    render() {
        let co
        let creations
        let profil
        let personnaliser

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
            personnaliser = (
                <Link to="/personnaliser">
                    {" "}
                    <StyledButton children="Personnaliser" />{" "}
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
                    {personnaliser}
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
