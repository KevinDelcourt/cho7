import React, { Component } from "react"
import styled from "styled-components"
import { hasRole, deleteCreation } from "../../modules/api"
import { getAudioUrl } from "../../modules/apiURL"
import { Link, Redirect } from "react-router-dom"
import { connect } from "react-redux"
import { bindActionCreators } from "redux"
import { msgAction } from "../../modules/actionsAndReducers"
import ReactAudioPlayer from "react-audio-player"
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

    constructor(props) {
        super(props)
        this.cptEcoute = this.cptEcoute.bind(this)
    }

    async componentDidMount() {
        this.setState({ auth: await hasRole("CREATEUR") })
    }

    handleDeleteClick = async () => {
        if (await deleteCreation(this.props.valueId)) {
            this.props.msgAction("Supression effectuée avec succès")
            this.setState({ redirect: <Redirect to="/accueil" /> })
        } else this.props.msgAction("Erreur dans la suppression")
    }

    cptEcoute = async () => {
        ajoutEcoute(this.props.valueId)
    }

    render() {
        const path = getAudioUrl() + this.props.path
        let suprime = null

        if (this.state.auth) {
            suprime = (
                <Supprime>
                    <Link to={"/updateCreation/" + this.props.valueId}>
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
                <ReactAudioPlayer
                    controls
                    src={path}
                    onEnded={this.cptEcoute}
                />
                <Wrapper>
                    <div>{this.props.description}</div>
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
