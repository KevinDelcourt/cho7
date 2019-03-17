import React from 'react';
import MainContainer from './../molecules/MainContainer';
import Template from './Template';
import { getUser , postProfilCreateur } from '../../modules/api';
import RenseignerProfilForm from '../organisms/RenseignerProfilForm'
import { Redirect } from 'react-router-dom'
import { msgAction } from '../../modules/actionsAndReducers'
import { connect } from 'react-redux'
import { bindActionCreators } from 'redux'

class RenseignerProfilPage extends React.Component {
	
	state={	
		redirect: "" 
	}

	async componentDidMount() {
		document.title = "Modifier Profil";
		this.setState({user: await getUser()})
	}
	
	onSubmit = async values => {
		let formData = new FormData()
		for(let obj in values){
			if(obj === 'fichierAvatar')
				formData.append(obj, values[obj][0])
			else
				formData.append(obj, values[obj])
		}

		if( await postProfilCreateur(formData) === true){
			this.props.msgAction("Profil renseigné avec succès")
			this.setState({redirect: <Redirect to="/" />})
		}else{
			this.props.msgAction("Erreur lors de la requête")
		}
	}

	render = () =>
		<Template>
			<MainContainer title="Profil">
				{this.state.user? 
					<RenseignerProfilForm onSubmit={this.onSubmit} initialValues={this.state.user} />
					:""
				}
			</MainContainer>
			{this.state.redirect}
		</Template>
}


const mapDispatchToProps = (dispatch) => {
    return bindActionCreators({msgAction},dispatch)
}

export default connect(null,mapDispatchToProps)(RenseignerProfilPage);

