import React from 'react';
import Template from './Template';
import NewsFeed from '../organisms/NewsFeed';
import Profile from '../organisms/Profile';

const AccueilPage = () => (
	<div>
		<Template>
			<Profile />
			<NewsFeed />
		</Template>
	</div>
)
	
export default AccueilPage