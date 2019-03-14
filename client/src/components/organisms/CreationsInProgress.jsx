import React from 'react';
import { getCreationsInProgress } from '../../modules/api';
import MainContainer from '../molecules/MainContainer';

class CreationsInProgress extends React.Component{
    state = {creations: []}

    async componentDidMount() {
        this.setState({creations: await getCreationsInProgress()})
    }

    render(){
        return(
            <MainContainer title="Mes créations en cours">
                <table>
                    <tbody>
                        <tr>
                            <th>Titre</th>
                            <th></th>
                        </tr>
                        {this.state.creations.map((c,index) =>
                            <tr key={index}>
                                <td>{c.titre}</td>
                                <td><a href={"/updateCreation/" + c.id}>Modifier</a></td>
                            </tr>
                        )}
                    </tbody>
                </table>
            </MainContainer>
        )
    }
}

export default CreationsInProgress;