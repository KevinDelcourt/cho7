import styled from "styled-components";
import React from 'react';
import LabelInput from "../molecules/LabelInput";
import LabelInputRange from "../molecules/LabelInputRange";
import Button from '../atoms/Button';
import LabelTextarea from "../molecules/LabelTextarea";
import { getEtatsCreation } from '../../modules/auth';
import theme from "./../../theme.json";

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

const StyledButton = styled(Button)`
	background-color:${theme.submitButton}
`;

class UpdateCreationForm extends React.Component {
	state = {etats:[]}

	async componentDidMount() {
        this.setState({etats: await getEtatsCreation(this.props.idCreation)})
	}

	render() {
		return(
			<form action={"http://localhost:8180/updateCreation/" + this.props.idCreation} method="post" enctype="multipart/form-data">
				<UpdateCreationFormContainer>
					<LabelInput name="titre" label="Titre : *" defaultValue={this.props.titre} />
					<input type="file" name="creation" accept="audio/mp3, audio/wav" />
					
					{this.state.etats.map((e, index) =>
						<LabelInputRange label={e.libelle} index={index} idEtat={e.id} value={e.valeuravancement} />
					)}

					<LabelTextarea name="description" label="Description :" row="10" col="20" defaultValue={this.props.desc} />

					<PublishButtonContainer>
						<StyledButton type="submit" children="Modifier"/>
					</PublishButtonContainer>
				</UpdateCreationFormContainer>
			</form>
		)
	}
}

export default UpdateCreationForm
