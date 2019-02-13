import React from 'react';
import Template from './Template';
import { hasRole } from '../../modules/auth';
import UploadForm from '../organisms/UploadForm';
import MainContainer from '../molecules/MainContainer';

class UploadPage extends React.Component {
	state = {auth:false}

	async componentDidMount() {
        document.title = "Importer un fichier";
		this.setState({auth:await hasRole("CREATEUR")})
	}

	render(){
		if (this.state.auth)
			return (
				<div>
					<Template>
						<MainContainer children="NOUVELLE CRÉATION">
							<UploadForm />
						</MainContainer>
					</Template>
				</div> 
			)

		return <span />
	}
}
	
export default UploadPage