import React, { Component } from "react"
import styled from "styled-components"
import { hasRole, deleteCreation } from "../../modules/api"
import { getAudioUrl } from "../../modules/apiURL"
import { Link, Redirect } from "react-router-dom"
import { connect } from "react-redux"
import { bindActionCreators } from "redux"
import { msgAction } from "../../modules/actionsAndReducers"
import ReactAudioPlayer from 'react-audio-player';

const Wrapper = styled.div`
    margin: 10px 0;
    padding: 5px 10px;
    background: rgba(255, 255, 255, 0.54);
    border-radius: 10px;
    overflow-wrap: break-word;
    font-family: "Ruluko", Arial, Sans-serif;
`

const Suprime = styled.div`
    display: flex;
    justify-content: flex-end;
`

class Creation extends Component {
    state = {
        auth: false
    }

    constructor(props){
        super(props);
        this.cptEcoute = this.cptEcoute.bind(this);
    }

    async componentDidMount() {
        this.setState({ auth: await hasRole("CREATEUR") })
    }

    delete = async () => {
        if (await deleteCreation(this.props.valueId))
            this.props.msgAction("Supression effectuée avec succès")
        else this.props.msgAction("Erreur dans la suppression")
        this.setState({ redirect: <Redirect to="/accueil" /> })
    }
    
    cptEcoute(){
        console.log("oui");
    }

    render() {
        const path = getAudioUrl() + this.props.path

        if (this.state.auth) {
            return (
                <React.Fragment>
                    <ReactAudioPlayer controls onPlay={this.cptEcoute} src={path} />
                    <Wrapper>
                        <div>{this.props.description}</div>
                        <Suprime>
                            <Link to={"/updateCreation/" + this.props.valueId}>
                                Modifier
                            </Link>
                            <button
                                className="far fa-times-circle fa-2x"
                                onClick={this.delete}
                            />
                        </Suprime>
                    </Wrapper>
                    {this.state.redirect}
                </React.Fragment>
            )
        } else {
            return (
                <React.Fragment>
                    <audio controls>
                        <source src={path} type="audio/mpeg" />
                    </audio>

                    <Wrapper>
                        <div>{this.props.description}</div>
                    </Wrapper>
                </React.Fragment>
            )
        }
    }
}

const mapDispatchToProps = dispatch => {
    return bindActionCreators({ msgAction }, dispatch)
}

export default connect(
    null,
    mapDispatchToProps
)(Creation)
