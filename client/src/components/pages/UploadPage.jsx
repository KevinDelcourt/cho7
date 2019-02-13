import React from 'react';
import styled from "styled-components";
import HeaderTemplate from '../organisms/HeaderTemplate';
import FooterTemplate from '../organisms/FooterTemplate';
import BodyUpload from '../organisms/BodyUpload';

import { hasRole } from '../../modules/auth';

const UploadFormContainer = styled.div`
	position:absolute;
	width:90%;
	margin-left:5%;
	margin-top:5%;
	background: rgba(145, 109, 67, 0.35);
	border-radius: 20px;
`

class UploadPage extends React.Component {
	state = {auth:false}

	async componentDidMount() {
        document.title = "Importer un fichier";
		this.setState({auth:await hasRole("CREATEUR")})
	}

	render(){
		if(this.state.auth)
			return(
				<div>
					<HeaderTemplate />
					<UploadFormContainer>
						<BodyUpload />
					</UploadFormContainer>
					<FooterTemplate left={<a href="/">La Compagnie de l'Aventure</a>} right={<a href="/">A propos</a>}/>
				</div>
			)

		return <span />
	}
}
	
export default UploadPage