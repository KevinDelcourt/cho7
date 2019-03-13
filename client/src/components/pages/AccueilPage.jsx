import styled from "styled-components";
import React from 'react';
import Template from './Template';
import NewsFeed from '../organisms/NewsFeed';
import Profile from '../organisms/Profile';
import Projet from '../organisms/Projet';

const AccueilContainer = styled.section`
	display: grid;
	grid-template-columns: 26% 70%;
	grid-column-gap: 4%;
	grid-row-gap: 4%;
`;

const AccueilPage = () => (
	<div>
		<Template>
			<AccueilContainer>	
				<Projet />			
				<NewsFeed />
				<Profile />		
			</AccueilContainer>
		</Template>
	</div>
)
	
export default AccueilPage