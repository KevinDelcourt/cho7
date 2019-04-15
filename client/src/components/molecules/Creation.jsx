import React, { Component } from "react"
import styled from "styled-components"
import AudioPlayer from "react-modular-audio-player"
import { hasRole, deleteCreation } from "../../modules/api"
import { getAudioUrl } from "../../modules/apiURL"
import Link from "../atoms/Link/Link"
import { Redirect } from "react-router-dom"
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

    .audio-player-time {
        color: black;
    }

    .marquee {
        color: black;
    }
`

let rearrangedPlayer = [
    {
        className: "tier-top",
        style: { margin: "0.3rem" },
        innerComponents: [
            {
                type: "play",
                style: { width: "fit-content" }
            },
            {
                type: "rewind",
                style: { width: "fit-content" }
            },
            {
                type: "forward",
                style: { width: "fit-content" }
            },
            {
                type: "volume"
            }
        ]
    },
    {
        className: "tier-bottom",
        style: { margin: "0rem 0.3rem 0.3rem 0.3rem" },
        innerComponents: [
            {
                type: "time",
                style: { width: "fit-content" }
            },
            {
                type: "seek"
            }
        ]
    }
]

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
                        <Link to={"/updateCreation/" + this.props.valueId}>
                            <i className="fas fa-edit" />
                        </Link>
                        <Link to="/" onClick={this.handleDeleteClick}>
                            <i className="far fa-times-circle" />
                        </Link>
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
                    playerWidth="100%"
                    rearrange={rearrangedPlayer}
                />

                {this.displayDetails()}
                {this.state.redirect}
            </Fragment>
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
