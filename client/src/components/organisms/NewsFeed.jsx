import React from 'react';
import { getCreations } from '../../modules/auth';
import Creation from "./Creation";
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
                    <div>
                        <h2>{c.titre}</h2>
                        <Creation path={c.nomfichier}/>
                        <h3>{c.description}</h3>
                    </div>
                )}
            </MainContainer>
        )
    }
}