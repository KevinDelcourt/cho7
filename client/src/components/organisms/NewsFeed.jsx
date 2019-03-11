import styled from "styled-components";
import React from 'react';
import { getCreations } from '../../modules/auth';
import Creation from "../atoms/Creation";
import MainContainer from '../molecules/MainContainer';

const SubContainer = styled.div`
    display: grid;
    grid-row-gap: 20px;
    grid-template-columns: 100%;
`;

class NewsFeed extends React.Component{
    state = {creations: []}

    async componentDidMount(){
        this.setState({creations: await getCreations()})
    }

    render(){
        return(
            <MainContainer title="Accueil">
                <SubContainer>
                    {this.state.creations.map((c) =>
                        <MainContainer title={c.titre}>
                            <Creation path={c.nomfichier} description={c.description} valueId={c.id}/>
                        </MainContainer>
                    )}
                </SubContainer>
            </MainContainer>
        )
    }
}

export default NewsFeed;