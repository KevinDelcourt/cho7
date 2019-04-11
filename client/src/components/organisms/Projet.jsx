import styled from "styled-components"
import React from "react"
import { getAvancement } from "../../modules/api"
import { Redirect } from "react-router-dom"
import Link from "../atoms/Link/Link"

import { hasRole, deleteCreation } from "../../modules/api"
import MainContainer from "./../molecules/MainContainer"
import DescriptionContainer from "./../atoms/Container/DescriptionContainer"

const SubContainer = styled.div`
    display: grid;
    grid-row-gap: 20px;
    grid-template-columns: 100%;
`

const StateContainer = styled.div`
    font-size: 20px;
`

const DetailsContainer = styled.div`
    display: flex;
    justify-content: space-between;
`

class Projet extends React.Component {
    state = {
        auth: false,
        avancement: []
    }

    async componentDidMount() {
        this.setState({ auth: await hasRole("CREATEUR") })
        this.setState({ avancement: await getAvancement() })
    }

    handleDeleteClick = async id => {
        if (await deleteCreation(id)) {
            this.setState({ redirect: <Redirect to="/accueil" /> })
        } else this.props.msgAction("Erreur dans la suppression")
    }

    datetostring = timestamp => {
        var t = timestamp.split(/[- :TZ]/)
        return t[2] + "/" + t[1] + "/" + t[0]
    }

    displayDetails = (id, maj) => {
        if (this.state.auth) {
            return (
                <DetailsContainer>
                    {this.datetostring(maj)}

                    <div>
                        <Link
                            className="fas fa-edit"
                            to={"/updateCreation/" + id}
                        />
                        <Link
                            to="/"
                            className="far fa-times-circle fa-2x deleteButton"
                            onClick={() => this.handleDeleteClick(id)}
                        />
                    </div>
                </DetailsContainer>
            )
        } else {
            return this.datetostring(maj)
        }
    }

    displayDescription = desc => {
        if (desc == null || desc === "") {
            return <React.Fragment />
        } else {
            return <DescriptionContainer>{desc}</DescriptionContainer>
        }
    }

    render() {
        return (
            <MainContainer title="Projets en cours">
                <SubContainer>
                    {this.state.avancement.map((c, index) => (
                        <MainContainer key={index} title={c[0].titre}>
                            {c.map((etat, index) => (
                                <StateContainer key={index}>
                                    <label>{etat.libelle + " : "}</label>
                                    {etat.valeuravancement + "%"}
                                </StateContainer>
                            ))}

                            {this.displayDescription(c[0].description)}
                            {this.displayDetails(c[0].id, c[0].miseajour)}
                        </MainContainer>
                    ))}
                </SubContainer>
                {this.state.redirect}
            </MainContainer>
        )
    }
}

export default Projet
