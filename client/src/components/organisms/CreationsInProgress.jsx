import React from 'react';
import { getCreationsInProgress } from '../../modules/auth';
import MainContainer from '../molecules/MainContainer';
import { deleteCreation } from '../../modules/auth';

class CreationsInProgress extends React.Component{
    state = {creations: []}

    async componentDidMount() {
        this.setState({creations: await getCreationsInProgress()})
    }

    async handleDeleteClick(e, id) {
		e.preventDefault();
		if (await deleteCreation(id))
			window.location.reload()
	}

    render(){
        return(
            <MainContainer title="Mes créations en cours">
                <table>
                    <tr>
                        <th>Titre</th>
                        <th></th>
                        <th></th>
                    </tr>
                    {this.state.creations.map((c) =>
                        <tr>
                            <td>{c.titre}</td>
                            <td><a href={"/updateCreation/" + c.id}>Modifier</a></td>
                            <td><button class="deleteButton" onClick={(e) => this.handleDeleteClick(e, c.id)}>Supprimer</button></td>
                        </tr>
                    )}
                </table>
            </MainContainer>
        )
    }
}

export default CreationsInProgress;