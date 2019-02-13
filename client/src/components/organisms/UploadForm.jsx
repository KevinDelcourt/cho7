import styled from "styled-components";
import React from 'react';
import LabelInput from "../molecules/LabelInput";
/*import SubmitBtn from "../atoms/SubmitBtn";*/
/*import LabelTextArea from "../molecules/LabelTextArea";*/

const UploadFormContainer = styled.div`
	background: rgba(145, 109, 67, 0.35);
	border-radius: 20px;
	padding: 30px;
	display: grid;	
	grid-template-rows: repeat(4, auto);
	justify-content: center;
`;

const PublishButtonContainer = styled.div`
	justify-self: end;
`;

class UploadForm extends React.Component{
	render() {
		return(
			<UploadFormContainer>
				<LabelInput children="Titre : *" />
				<input type="file" name="file" accept="audio/mp3, audio/wav" />
				{/* <LabelTextArea children="Description :" /> */}
				<textarea name="oi" id="" cols="30" rows="10"></textarea>

				<PublishButtonContainer>
					{/*<SubmitBtn children="Publier"/>*/}
					<button>Publier</button>
				</PublishButtonContainer>
			</UploadFormContainer>
		)
	}
}

export default UploadForm
