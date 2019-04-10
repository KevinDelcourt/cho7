import React, { Component } from "react"
import styled from "styled-components"
import AudioPlayer from "react-modular-audio-player"
import { hasRole, deleteCreation } from "../../modules/api"
import { getAudioUrl } from "../../modules/apiURL"
import { Link, Redirect } from "react-router-dom"
import { connect } from "react-redux"
import { bindActionCreators } from "redux"
import { msgAction } from "../../modules/actionsAndReducers"
import { ajoutEcoute } from "../../modules/api"

const Wrapper = styled.div`
    margin: 10px 0;
    padding: 5px 10px;
    background: rgba(255, 255, 255, 0.54);
    border-radius: 10px;
    overflow-wrap: break-word;
    font-family: "Ruluko", Arial, Sans-serif;
`

const Supprime = styled.div`
    display: flex;
    justify-content: flex-end;
`

class Creation extends Component {
    state = {
        auth: false
    }
    rap

    async componentDidMount() {
        this.setState({ auth: await hasRole("CREATEUR") })
        this.rap.audioRef.addEventListener("playing", e => {
            ajoutEcoute(this.props.creation.id)
        })
    }

    handleDeleteClick = async () => {
        if (await deleteCreation(this.props.creation.id)) {
            this.props.msgAction("Supression effectuée avec succès")
            this.setState({ redirect: <Redirect to="/accueil" /> })
        } else this.props.msgAction("Erreur dans la suppression")
    }

    render() {
        const path = getAudioUrl() + this.props.creation.nomfichier
        let suprime = null

        if (this.state.auth) {
            suprime = (
                <Supprime>
                    <Link to={"/updateCreation/" + this.props.creation.id}>
                        Modifier
                    </Link>
                    <button
                        className="far fa-times-circle fa-2x"
                        onClick={this.delete}
                    />
                </Supprime>
            )
        }

        return (
            <React.Fragment>
                <AudioPlayer
                    audioFiles={[
                        {
                            src: path,
                            title: this.props.creation.nbecoute + " ecoutes",
                            artist: ""
                        }
                    ]}
                    ref={element => {
                        this.rap = element
                    }}
                    iconSize="2rem"
                    fontSize="1rem"
                    playerWidth="30rem"
                />

                <Wrapper>
                    <div>{this.props.creation.description}</div>
                    {suprime}
                </Wrapper>
                {this.state.redirect}
            </React.Fragment>
        )
    }
}

const mapDispatchToProps = dispatch => {
    return bindActionCreators({ msgAction }, dispatch)
}

export default connect(
    null,
    mapDispatchToProps
)(Creation)
