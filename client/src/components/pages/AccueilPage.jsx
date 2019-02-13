import React from 'react';
import Template from './Template';
import TestFilDactu from '../organisms/TestFilDactu';

const Body = <TestFilDactu />;

const AccueilPage = () => (
	<div>
		<Template children={Body} />
	</div>
)
	
export default AccueilPage