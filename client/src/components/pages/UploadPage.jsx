import React from 'react';
import Template from './Template';
import { hasRole } from '../../modules/auth';

const Body = <h2>Upload - Réservé au créateur</h2>;


class UploadPage extends React.Component {
	state = {auth:false}

	async componentDidMount() {
        document.title = "Importer un fichier";
		this.setState({auth:await hasRole("CREATEUR")})
	}

	render(){
		if(this.state.auth)
			return(
				<div>
					<Template children={Body} />
				</div> 
			)

		return <span />
	}
}
	
export default UploadPage