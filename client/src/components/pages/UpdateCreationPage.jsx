import React from 'react';
import Template from './Template';
import { hasRole } from '../../modules/api';
import UpdateCreationForm from '../organisms/UpdateCreationForm';
import MainContainer from '../molecules/MainContainer';
import { getCreation } from '../../modules/api';

const idCreation = window.location.href.split('/').pop();

class UpdateCreationPage extends React.Component {
    state = {auth:false, loaded:false}

	async componentDidMount() {
        document.title = "Modifier création";
        this.setState({creation: await getCreation(idCreation)})
		this.setState({auth: await hasRole("CREATEUR")})
        this.setState({loaded: true})
	}

	render(){
		if (this.state.auth)
			return (
				<div>
					<Template>
                        <MainContainer title="MODIFIER CRÉATION">
							{this.state.creation?
								<UpdateCreationForm titre={this.state.creation.titre} fichier={this.state.creation.nomfichier} desc={this.state.creation.description} idCreation={idCreation} />
								:""
							}

						</MainContainer>
					</Template>
				</div> 
			)
			
		if (this.state.loaded)
            window.location="/"
            return <React.Fragment />
	}
}
	
export default UpdateCreationPage