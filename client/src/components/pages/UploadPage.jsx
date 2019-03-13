import React from 'react';
import Template from './Template';
import { hasRole } from '../../modules/auth';
import UploadForm from '../organisms/UploadForm';
import MainContainer from '../molecules/MainContainer';
import styled from "styled-components";

const StyledUploadForm = styled(UploadForm)`
	width: 90%;
`;

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
						<MainContainer title="NOUVELLE CRÉATION">
							<StyledUploadForm />
						</MainContainer>
					</Template>
				</div> 
			)
		return <span />
	}
}
	
export default UploadPage