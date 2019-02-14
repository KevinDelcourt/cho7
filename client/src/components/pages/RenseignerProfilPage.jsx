import React from 'react';
import Avatar from './../molecules/Avatar';
import LabelTextarea from './../molecules/LabelTextarea';
import LabelInput from './../molecules/LabelInput';
import MainContainer from './../molecules/MainContainer';
import Template from './Template';
import Submitbutton from './../atoms/Submitbutton';
import styled from 'styled-components';
import avatar from './../../assets/images/avatar.jpg';

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
    render(){
		return(
            <Template>
                <MainContainer title="Profil">
                    <Cadre>
                        <FormContainer>
                            <LabelInput label={"Pseudo :"} wInput="25" wLabel="10" />
                            <LabelInput label={"Mot de passe :"} wInput="25" wLabel="10" type="password"/>
                            <LabelInput label={"Mail :"} wInput="25" wLabel="10" />
                            <LabelTextarea label={"Description :"} row="7" col="50" />
                        </FormContainer>
                        <RightColumn>
                            <AvatarContainer class='AvatarContainer'>
                                <Avatar pathImage={avatar}/>
                                <input type='file' />       
                            </AvatarContainer>
                            <Submitbutton>Modifier Profil</Submitbutton>
                        </RightColumn>
                    </Cadre>
                </MainContainer>
            </Template>
        )
    }
}

export default RenseignerProfilPage