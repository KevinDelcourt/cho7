import React from 'react';
import LabelBase from '../atoms/LabelBase';
import styled from "styled-components";

const styleDivContainer = styled.div`
	display: inline-block;
`;

class LabelInputRange extends React.Component {
	render(){
		return(
			<styleDivContainer>
				<LabelBase children={this.props.label} />
				<input type="hidden" name={"libelle["+this.props.index+"]"} value={this.props.label} />
				<input type="hidden" name={"idEtat["+this.props.index+"]"} value={this.props.idEtat} />
				<input type='range' min="0" max="100" step="1" name={"valeur["+this.props.index+"]"} defaultValue={this.props.value}/>
			</styleDivContainer>
		);
	}
}

export default LabelInputRange;