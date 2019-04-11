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
import DescriptionContainer from "./../atoms/Container/DescriptionContainer"

const EditOptionsContainer = styled.div`
    display: flex;
    justify-content: flex-end;
`
const Fragment = styled.div`
    .audio-player {
        background-color: #b7b7b7;
        padding: 0.5rem;
        border-radius: 10px;
        filter: invert(100%);
    }
`

class Creation extends Component {
    state = {
        auth: false
    }
    rap

    async componentDidMount() {
        this.setState({ auth: await hasRole("CREATEUR") })
        if (this.rap)
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

    displayDetails = () => {
        if (this.state.auth) {
            return (
                <DescriptionContainer>
                    {this.props.creation.description}
                    <EditOptionsContainer>
                        <Link
                            className="fas fa-edit"
                            to={"/updateCreation/" + this.props.valueId}
                        />
                        <button
                            className="far fa-times-circle fa-2x deleteButton"
                            onClick={this.handleDeleteClick}
                        />
                    </EditOptionsContainer>
                </DescriptionContainer>
            )
        } else {
            return (
                <DescriptionContainer>
                    {this.props.creation.description}
                </DescriptionContainer>
            )
        }
    }

    render() {
        const path = getAudioUrl() + this.props.creation.nomfichier

        return (
            <Fragment>
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

                {this.displayDetails()}
                {this.state.redirect}
            </Fragment>
        )
    }
}

const mapStateToProps = state => {
    return {
        playerColorMain: state.app.theme.colorAudioPlayerMain,
        playerColorBg: state.app.theme.colorAudioPlayerBg
    }
}

const mapDispatchToProps = dispatch => {
    return bindActionCreators({ msgAction }, dispatch)
}

export default connect(
    mapStateToProps,
    mapDispatchToProps
)(Creation)
