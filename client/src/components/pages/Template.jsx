import React from 'react';
import styled from "styled-components";
import HeaderTemplate from '../organisms/HeaderTemplate';
import FooterTemplate from '../organisms/FooterTemplate';

const TemplateContainer = styled.div`
	display: grid;
	grid-template-rows: 26vh auto 10vh;
	grid-row-gap: 2vh;
`;

const BodyContainer = styled.div`
	min-height: 60vh;
	width: 85vw;
	margin-right: auto;
	margin-left: auto;
	background: rgba(145, 109, 67, 0.35);
	border-radius: 20px;
	padding: 5vh 5vw;
`;

class Template extends React.Component {
	render(){
		return(
			<TemplateContainer>
				<HeaderTemplate />
				<BodyContainer>{this.props.children}</BodyContainer>
				<FooterTemplate />
			</TemplateContainer> 
		)
	}
}
	
export default Template