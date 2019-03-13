import styled from "styled-components";
import React from 'react';
import LabelInput from "../molecules/LabelInput";
import Submitbutton from "../atoms/Submitbutton";
import LabelTextarea from "../molecules/LabelTextarea";
import InputAddButton from "./InputAddButton";

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
			<form action="http://localhost:8180/addcreation" method="post" enctype="multipart/form-data">
				<UploadFormContainer>
					<LabelInput name="titre" label="Titre : *" />
					<input type="file" name="creation" accept="audio/mp3, audio/wav" />

					<InputAddButton />
					
					<LabelTextarea name="description" label="Description :" row="10" col="20" />
					<PublishButtonContainer>
						<Submitbutton type="submit" children="Publier"/>
					</PublishButtonContainer>
				</UploadFormContainer>
			</form>
		)
	}
}

export default UploadForm
