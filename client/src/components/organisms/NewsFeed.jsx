import React from 'react';
import { getCreations } from '../../modules/auth';
import Creation from "../atoms/Creation";
import MainContainer from '../molecules/MainContainer';

export default class NewsFeed extends React.Component{
    state = {creations: []}

    async componentDidMount(){
        this.setState({creations: await getCreations()})
    }

    render(){
        return(
            <MainContainer title="Accueil">
                {this.state.creations.map((c) =>
                    <MainContainer title={c.titre}>
                        <Creation path={c.nomfichier} description={c.description} />
                    </MainContainer>
                )}
            </MainContainer>
        )
    }
}