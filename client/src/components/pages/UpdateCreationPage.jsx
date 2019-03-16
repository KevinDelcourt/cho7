import React from 'react';
import Template from './Template';
import { hasRole } from '../../modules/api';
import UpdateCreationForm from '../organisms/UpdateCreationForm';
import MainContainer from '../molecules/MainContainer';
import { getCreation } from '../../modules/api';


class UpdateCreationPage extends React.Component {
    state = { }

	async componentDidMount() {
        document.title = "Modifier création";
        this.setState({creation: await getCreation(this.props.match.params.id)})

	}

	render(){
			return (
				
					<Template>
                        <MainContainer title="MODIFIER CRÉATION">
							{this.state.creation?
								<UpdateCreationForm titre={this.state.creation.titre} fichier={this.state.creation.nomfichier} desc={this.state.creation.description} idCreation={this.props.match.params.id} />
								:""
							}

						</MainContainer>
					</Template>
				
			)

	}
}
	
export default UpdateCreationPage