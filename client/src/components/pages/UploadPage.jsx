import React from 'react';
import { hasRole } from '../../modules/auth';


class UploadPage extends React.Component {
	state = {auth:false}

async componentDidMount(){
	this.setState({auth:await hasRole("CREATEUR")})
}

	render(){
		if(this.state.auth)
			return(
				<div>
					<h2>Upload - Réservé au créateur</h2>
				</div>
			)

		return <span />
	}
}
	
export default UploadPage