import styled from "styled-components";
import React from 'react';
import { getAvancement } from '../../modules/auth';
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
    font-family: "Ruluko", Arial, Sans-serif;
    font-size: 20px;
`

class Projet extends React.Component {
    state = { avancement: [] }

    async componentDidMount() {
        this.setState({ avancement: await getAvancement() })
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
                        <MainContainer key={index}>
                            <h2>{c[0].titre}</h2>
                            {c.map((etat, index) => (
                                <StateContainer key={index}>
                                    <label>{etat.libelle}</label>
                                    {etat.valeuravancement + "%"}
                                </StateContainer>
                            ))}
                            <DescriptionContainer>
                                {c[0].description}
                            </DescriptionContainer>
                            {this.datetostring(c[0].miseajour)}
                        </MainContainer>
                    ))}
                </SubContainer>
            </MainContainer>
        )
    }
}

export default Projet
