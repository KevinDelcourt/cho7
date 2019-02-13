import React from 'react';
import Template from './Template';
import TestFilDactu from '../organisms/TestFilDactu';

const Body = <TestFilDactu />;

const AccueilPage = () => (
	<div>
    <h1>ACCUEIL</h1>
		<Template children={Body} />
	</div>
)
	
export default AccueilPage