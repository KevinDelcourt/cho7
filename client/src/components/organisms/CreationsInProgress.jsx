import React from 'react';
import { getCreationsInProgress } from '../../modules/auth';
import MainContainer from '../molecules/MainContainer';

class CreationsInProgress extends React.Component{
    state = {creations: []}

    async componentDidMount(){
        document.title = "Mes créations";
        this.setState({creations: await getCreationsInProgress()})
    }

    render(){
        return(
            <MainContainer title="Mes créations en cours">
                <table>
                    <tr>
                        <th>Titre</th>
                        <th></th>
                    </tr>
                    {this.state.creations.map((c) =>
                        <tr>
                            <td>{c.titre}</td>
                            <td><a href={"/updateCreation?id=" + c.id}>Modifier</a></td>
                        </tr>
                    )}
                </table>
            </MainContainer>
        )
    }
}

export default CreationsInProgress;