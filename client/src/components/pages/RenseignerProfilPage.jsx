import React from 'react';
import Avatar from './../molecules/Avatar';
import LabelTextarea from './../molecules/LabelTextarea';
import LabelInput from './../molecules/LabelInput';
import MainContainer from './../molecules/MainContainer';
import Template from './Template';
import Button from './../atoms/Button';
import styled from 'styled-components';
import { getUser , hasRole , postProfilCreateur } from '../../modules/api';
import { getImageUrl } from '../../modules/apiURL';
import theme from "./../../theme.json";

const Cadre = styled.div`
	display: flex;
	justify-content: space-around;
	align-items: center;
	padding: 7vh 4vw;
	height: 70vh;
`;

const AvatarContainer = styled.div`
	display: flex;
	flex-direction: column;
	justify-content: space-between;
	width : 20vw;
	height: 45vh;
`;

const FormContainer = styled.div`
	display: flex;
	justify-content: space-around;
	flex-direction: column;
	height: 50vh;
	min-width: 35vw;
`;

const RightColumn = styled.div`
	display: flex;
	height: 100%;
	justify-content: space-between;
	flex-direction: column;
`;

class RenseignerProfilPage extends React.Component {
	
	state={
		auth:false, 
		loaded:false, 
		user:{}
	}

	async componentDidMount() {
		document.title = "Modifier Profil";
		this.setState({user: await getUser()})
		this.setState({auth: await hasRole("CREATEUR")})
        this.setState({loaded: true})
	}

	fileSelect = (evt) => {
		if(evt.target.files[0]){
			this.setUserProperty('fichierAvatar',evt.target.files[0])
			this.setUserProperty('avatar',evt.target.files[0].name)
		}	
	}

	setUserProperty = (propName,value) => {
		let user = this.state.user
		user[propName] = value
		this.setState({user: user})
	}
	
	onSubmit = (e) => {
		e.preventDefault()//action="http://localhost:8180/renseignerprofil"
		let formData = new FormData()
		for(let obj in this.state.user)
			formData.append(obj,this.state.user[obj])
		postProfilCreateur(formData)
	}
	render() {
		if (this.state.auth)
			return(
				<Template>
					<MainContainer title="Profil">
						<form onSubmit={this.onSubmit}>
							<Cadre>
								<FormContainer>
									<LabelInput defaultValue={this.state.user.username} label={"Pseudo :"} wInput="25" wLabel="10" onChange={(evt)=>this.setUserProperty("username",evt.target.value)}/>
									<LabelInput type="password" defaultValue={this.state.user.password} label={"Mot de passe :"} wInput="25" wLabel="10" onChange={(evt)=>this.setUserProperty("password",evt.target.value)}/>
									<LabelInput defaultValue={this.state.user.email} label={"Mail :"} wInput="25" wLabel="10" onChange={(evt)=>this.setUserProperty("email",evt.target.value)}/>
									<LabelTextarea defaultValue={this.state.user.presentation} label="Description :" row="7" col="50" onChange={(evt)=>this.setUserProperty("presentation",evt.target.value)}/>
								</FormContainer>
								<RightColumn>
									<AvatarContainer >
										<Avatar src={this.state.user.fichierAvatar? URL.createObjectURL(this.state.user.fichierAvatar) : getImageUrl(this.state.user.avatar)}/>
										<input type="file" onChange={this.fileSelect}/>      
									</AvatarContainer>
									<Button type="submit" children="Modifier Profil" bgColor={theme.submitButton}></Button>
								</RightColumn>
							</Cadre>
						</form>
					</MainContainer>
				</Template>
			)
		
		if (this.state.loaded)
			window.location="/"
			
        return <React.Fragment />
		
	}
}

export default RenseignerProfilPage