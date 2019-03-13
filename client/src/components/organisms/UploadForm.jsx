import styled from "styled-components";
import React from 'react';
import LabelInput from "../molecules/LabelInput";
import Button from "../atoms/Button";
import LabelTextarea from "../molecules/LabelTextarea";
import theme from "./../../theme.json";
import InputAddButton from "./InputAddButton";

const UploadFormContainer = styled.div`
	display: grid;	
	grid-template-rows: repeat(4, auto);
	grid-row-gap: 20px;
	justify-content: center;
	margin:5%;
`;

const StyledButton = styled(Button)`
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
					<LabelTextarea name="description" label="Description :" row="10" col="120" />	
					<StyledButton type="submit" children="Publier" bgColor={theme.bgColor.submitButton}/>
				</UploadFormContainer>
			</form>
		)
	}
}

export default UploadForm
