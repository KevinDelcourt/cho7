import React from 'react';
import Template from './Template';
import MainBody from '../organisms/MainBody';

const Body = <MainBody/>;

const AccueilPage = () => (
	<div>
		<Template children={Body} />
	</div>
)
	
export default AccueilPage