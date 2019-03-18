import styled from "styled-components";
import React from 'react';
import LabelInput from "../molecules/LabelInput";
import AudioInput from "../molecules/AudioInput"
import Button from "../atoms/Button";
import LabelTextarea from "../molecules/LabelTextarea";
import theme from "./../../theme.json";
import { Field, reduxForm, FieldArray } from 'redux-form'
import { required } from "../../modules/validation"
import EtatsAvancementInput from "../molecules/EtatsAvancementInput";
import MainContainer from '../molecules/MainContainer';

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
			<form onSubmit={this.props.handleSubmit}>
				<MainContainer title="NOUVELLE CRÉATION">

				<UploadFormContainer>
					<Field 
						component={LabelInput}
						name="titre"
						type="text"
						label="Titre *"
						validate={[required]}
						/>
					
					<Field
						component={AudioInput}
						name="creation"
						audio={this.props.initialValues?this.props.initialValues.nomfichier:""}
						/>
					
					<FieldArray 
						component={EtatsAvancementInput}
						name="etats"
						lock={this.props.lock}
						/>

					<Field
						component={LabelTextarea}
						name="description"
						label="Description :"
						row="10" col="120"
						/>

					<StyledButton type="submit" children="Publier" bgColor={theme.submitButton}/>
				</UploadFormContainer>
				</MainContainer>

			</form>
		)
	}
}

UploadForm = reduxForm({
    form: "nouvelle création "
})(UploadForm)

export default UploadForm;
