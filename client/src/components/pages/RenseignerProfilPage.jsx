import React from 'react';
import Avatar from './../molecules/Avatar';
import LabelTextarea from './../molecules/LabelTextarea';
import LabelInput from './../molecules/LabelInput';
import MainContainer from './../molecules/MainContainer';
import Template from './Template';
import Button from './../atoms/Button';
import styled from 'styled-components';
import { getUser } from '../../modules/auth';
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
                                <LabelInput name="username" defaultValue={this.state.user.username} label={"Pseudo :"} wInput="25" wLabel="10"/>
                                <LabelInput type="password" name="password" defaultValue={this.state.user.password} label={"Mot de passe :"} wInput="25" wLabel="10"/>
                                <LabelInput name="email" defaultValue={this.state.user.email} label={"Mail :"} wInput="25" wLabel="10"/>
                                <LabelTextarea name="presentation" value={this.state.user.presentation} label={"Description :"} row="7" col="50" onChange={(evt)=>this.setState({user:{username:this.state.user.username,password:this.state.user.password,email:this.state.user.email,avatar:this.state.user.avatar,presentation:evt.target.value}})}/>
                            </FormContainer>
                            <RightColumn>
                                <AvatarContainer >
                                    <Avatar src={"http://localhost:8180/public/images/"+this.state.user.avatar}/>
                                    <input type="file" name="avatar" />      
                                </AvatarContainer>
                                <Button type="submit" children="Modifier Profil" bgColor={theme.bgColor.submitButton}></Button>
                            </RightColumn>
                        </Cadre>
                    </form>
                </MainContainer>
            </Template>
        )
    }
}

export default RenseignerProfilPage