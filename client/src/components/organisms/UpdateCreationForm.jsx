import styled from "styled-components";
import React from 'react';
import LabelInput from "../molecules/LabelInput";
import Submitbutton from "../atoms/Submitbutton";
import LabelTextarea from "../molecules/LabelTextarea";

const UpdateCreationFormContainer = styled.div`
	display: grid;	
    grid-template-rows: repeat(4, auto);
    grid-template-columns: 70%;
	grid-row-gap: 20px;
	justify-content: center;
`;

const PublishButtonContainer = styled.div`
	justify-self: end;
`;

const idCreation = window.location.href.split('/').pop();

class UpdateCreationForm extends React.Component{
	render() {
		return(
			<form action={"http://localhost:8180/updateCreation/" + idCreation} method="post" enctype="multipart/form-data">
				<UpdateCreationFormContainer>
					<LabelInput name="titre" label="Titre : *" defaultValue={this.props.titre} />
					<input type="file" name="creation" accept="audio/mp3, audio/wav" />
					<LabelTextarea name="description" label="Description :" row="10" col="20" defaultValue={this.props.desc} />
					
					<PublishButtonContainer>
						<Submitbutton type="submit" children="Modifier"/>
					</PublishButtonContainer>
				</UpdateCreationFormContainer>
			</form>
		)
	}
}

export default UpdateCreationForm
