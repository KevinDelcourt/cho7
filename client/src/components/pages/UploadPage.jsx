import React from 'react';
import Template from './Template';
import UploadForm from '../organisms/UploadForm';
import MainContainer from '../molecules/MainContainer';
import styled from "styled-components";

const StyledUploadForm = styled(UploadForm)`
	width: 90%;
`;

class UploadPage extends React.Component {

	componentDidMount() {
        document.title = "Importer un fichier";

	}

	render(){
			return (
				<div>
					<Template>
						<MainContainer title="NOUVELLE CRÉATION">
							<StyledUploadForm />
						</MainContainer>
					</Template>
				</div> 
			)
		
	}
}
	
export default UploadPage