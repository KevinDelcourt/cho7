import React from 'react';
import Template from './Template';
import MainBody from '../organisms/MainBody';

const Body = <MainBody/>;

const AccueilPage = () => (
	<div>
    <h1>ACCUEIL</h1>
		<Template children={Body} />
	</div>
)
	
export default AccueilPage