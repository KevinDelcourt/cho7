import React from 'react';
import HeaderTemplate from '../organisms/HeaderTemplate';
import FooterTemplate from '../organisms/FooterTemplate';
import { hasRole } from '../../modules/auth';


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
					<HeaderTemplate />
					<h2>Upload - Réservé au créateur</h2>
					<FooterTemplate left={<a href="/">La Compagnie de l'Aventure</a>} right={<a href="/">A propos</a>}/>
				</div>
			)

		return <span />
	}
}
	
export default UploadPage