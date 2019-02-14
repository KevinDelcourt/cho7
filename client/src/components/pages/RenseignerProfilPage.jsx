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
    render(){
		return(
            <Template>
                <MainContainer title="Profil">
                    <Cadre>
                        <FormContainer>
                            <LabelInput label={"Pseudo"}/>
                            <LabelInput label={"Mot de passe"}/>
                            <LabelInput label={"Mail"}/>
                            <LabelTextarea label={"Description"}/>
                        </FormContainer>
                        <RightColumn>
                            <AvatarContainer >
                                <Avatar src={avatar} />
                                <Submitbutton>AJOUT IMAGE</Submitbutton>       
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