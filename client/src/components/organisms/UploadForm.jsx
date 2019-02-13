import styled from "styled-components";
import React from 'react';
import LabelInput from "../molecules/LabelInput";
/*import SubmitBtn from "../atoms/SubmitBtn";*/
import LabelTextarea from "../molecules/LabelTextarea";

const UploadFormContainer = styled.div`
	display: grid;	
	grid-template-rows: repeat(4, auto);
	grid-row-gap: 20px;
	justify-content: center;
`;

const PublishButtonContainer = styled.div`
	justify-self: end;
`;

class UploadForm extends React.Component{
	render() {
		return(
			<UploadFormContainer>
				<LabelInput label="Titre : *" />
				<input type="file" name="file" accept="audio/mp3, audio/wav" />
				<LabelTextarea label="Description :" row="10" col="20" />
				
				<PublishButtonContainer>
					{/*<SubmitBtn children="Publier"/>*/}
					<button>Publier</button>
				</PublishButtonContainer>
			</UploadFormContainer>
		)
	}
}

export default UploadForm
