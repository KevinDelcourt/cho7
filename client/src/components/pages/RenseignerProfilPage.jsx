import React from 'react';
import Avatar from './../molecules/Avatar';
import LabelTextarea from './../molecules/LabelTextarea';
import LabelInput from './../molecules/LabelInput';
import MainContainer from './../molecules/MainContainer';
import Template from './Template';
import Submitbutton from './../atoms/Submitbutton';
import styled from 'styled-components';
import avatar from './../../assets/images/avatar.jpg';
import { getUser } from '../../modules/auth';

const Cadre = styled.div`
    display: flex;
    justify-content: space-between;
    flex-direction: row;
    padding: 7vh 9vw;
    height: 100vh;
`;
const AvatarContainer = styled.div`
    display: flex;
    flex-direction: column;
    justify-content: space-between;
    width : 20vw;
    height: 30vh;
`;

const FormContainer = styled.div`
    display: flex;
    justify-content: space-between;
    flex-direction: column;
    margin-top: 96px;
`;
const RightColumn = styled.div`
    display: flex;
    height: 100%;
    justify-content: space-between;
    flex-direction: column;
`;

class RenseignerProfilPage extends React.Component {
    state={user:{
        username:"",
        password:"",
        email:"",
        presentation:"",
        avatar:""
    }}

    async componentDidMount() {
        this.setState({user: await getUser()})
    }
    
    render(){
		return(
            <Template>
                <MainContainer title="Profil">
                    <form action="http://localhost:8180/renseignerprofil" method="post" enctype="multipart/form-data">
                        <Cadre>
                            <FormContainer>
                                <LabelInput name="username" defaultValue={this.state.user.username} label={"Pseudo"} />
                                <LabelInput type="password" name="password" defaultValue={this.state.user.password} label={"Mot de passe"}/>
                                <LabelInput name="email" defaultValue={this.state.user.email} label={"Mail"} />
                                <LabelTextarea name="presentation" value={this.state.user.presentation} label={"Description"} onChange={(evt)=>this.setState({user:{username:this.state.user.username,password:this.state.user.password,email:this.state.user.email,avatar:this.state.user.avatar,presentation:evt.target.value}})}/>
                            </FormContainer>
                            <RightColumn>
                                <AvatarContainer >
                                    <Avatar pathImage={"http://localhost:8180/public/images/"+this.state.user.avatar}/>
                                    <input type="file" name="avatar" />      
                                </AvatarContainer>
                                <Submitbutton type="submit">Modifier Profil</Submitbutton>
                            </RightColumn>
                        </Cadre>
                    </form>
                </MainContainer>
            </Template>
        )
    }
}

export default RenseignerProfilPage