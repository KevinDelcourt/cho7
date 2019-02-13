import React from 'react';
import Template from './Template';
import { hasRole } from '../../modules/auth';
import styled from "styled-components";
import BodyUpload from '../organisms/BodyUpload';

const UploadFormContainer = styled.div`
	background: rgba(145, 109, 67, 0.35);
	border-radius: 20px;
	padding: 30px;
`;

class BodyUpload extends React.Component {
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
						<UploadFormContainer>
							<BodyUpload />
						</UploadFormContainer>
					</Template>
				</div> 
			)
		return <span />
	}
}
	
export default UploadPage