import React from 'react';
import { getCreationsInProgress } from '../../modules/api';
import MainContainer from '../molecules/MainContainer';
import { Link } from 'react-router-dom'

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
                                <td><Link to={"/updateCreation/" + c.id}>Modifier</Link></td>
                            </tr>
                        )}
                    </tbody>
                </table>
            </MainContainer>
        )
    }
}

export default CreationsInProgress;