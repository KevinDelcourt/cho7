import styled from "styled-components";
import React from 'react';
import { getAvencement } from '../../modules/auth';
import Creation from "../atoms/Creation";
import MainContainer from '../molecules/MainContainer';

const SubContainer = styled.div`
    display: grid;
    grid-row-gap: 20px;
    grid-template-columns: 100%;
`;

class NewsFeed extends React.Component{
    state = {avencement: []}

    async componentDidMount(){
        this.setState({avencement: await getAvencement()})
    }

    datetostring =(timestamp)=>{
        var t=timestamp.split(/[- :TZ]/)
        return t[2]+"/"+t[1]+"/"+t[0]
    }

    render(){
        return(
            <MainContainer title="Projets">
                <SubContainer>
                    {this.state.avencement.map((c) =>
                        <MainContainer title={c[0].titre}>
                        {c.map((etat)=> 
                            <MainContainer title={etat.libelle}>
                            {etat.valeuravancement}
                            </MainContainer>
                            )}
                        <MainContainer>
                            {c[0].description}
                            
                            </MainContainer>
                            <MainContainer>
                            {this.datetostring(c[0].miseajour)}
                            </MainContainer>
                        </MainContainer>
                    )}
                </SubContainer>
            </MainContainer>
        )
    }
}

export default NewsFeed;