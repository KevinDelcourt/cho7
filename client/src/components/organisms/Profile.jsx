import React from 'react';
import styled from "styled-components";
import { getCreator } from '../../modules/auth';
import Avatar from '../molecules/Avatar';
import profilPic from '../../assets/images/profil.png';

const Wrapper = styled.div`
    margin-top: 15px;
    padding: 5px 10px;
    background: rgba(255, 255, 255, 0.54);
    border-radius: 10px;
    overflow-wrap: break-word;
`;

const Container = styled.div`
    height: max-content;
    background: rgba(145, 109, 67, 0.35);
    border-radius: 20px;
    padding: 20px 30px;
`;

class Profile extends React.Component {
    state = {creations: []}

    async componentDidMount(){
        this.setState({creations: await getCreator()})
    }

    render(){
        return(
            <Container>
                <center><Avatar src={profilPic} /></center>
                {this.state.creations.map((u) => 
                    <Wrapper>
                        <h2>{u.username}</h2>
                        <p>{u.presentation}</p>
                    </Wrapper>
                )}
            </Container>
        )
    }
}

export default Profile;