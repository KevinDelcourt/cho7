import styled from "styled-components";
import React from 'react';
import { getAvancement } from '../../modules/api';
import { Link, Redirect } from "react-router-dom"
import { hasRole, deleteCreation } from "../../modules/api"
import MainContainer from './../molecules/MainContainer';

const SubContainer = styled.div`
    display: grid;
    grid-row-gap: 20px;
    grid-template-columns: 100%;
`

const DescriptionContainer = styled.div`
    margin: 10px 0;
    padding: 5px 10px;
    background: rgba(255, 255, 255, 0.54);
    border-radius: 10px;
    overflow-wrap: break-word;
    font-family: "Ruluko", Arial, Sans-serif;
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

    handleDeleteClick = async (id) => {
        if (await deleteCreation(id)) {
            this.setState({ redirect: <Redirect to="/accueil" /> })
        } else this.props.msgAction("Erreur dans la suppression")
    }

    datetostring = timestamp => {
        var t = timestamp.split(/[- :TZ]/)
        return t[2] + "/" + t[1] + "/" + t[0]
    }

    render() {
        return (
            <MainContainer title="Projets en cours">
                <SubContainer>
                    {this.state.avancement.map((c, index) => (
                        <MainContainer key={index} title={c[0].titre}>
                            {c.map((etat, index) => (
                                <StateContainer key={index}>
                                    <label>{etat.libelle + ' : '}</label>
                                    {etat.valeuravancement + "%"}
                                </StateContainer>
                            ))}

                            <DescriptionContainer>
                                {c[0].description}
                            </DescriptionContainer>
                            
                            <DetailsContainer>
                                {this.datetostring(c[0].miseajour)}
                                
                                <div>
                                    <Link className="fas fa-edit" to={"/updateCreation/" + c[0].id} />
                                    <button className="far fa-times-circle fa-2x deleteButton" onClick={() => this.handleDeleteClick(c[0].id)} />
                                </div>
                            </DetailsContainer>
                        </MainContainer>
                    ))}
                </SubContainer>
                {this.state.redirect}
            </MainContainer>
        )
    }
}

export default Projet
