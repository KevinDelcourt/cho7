import React from 'react';
import styled from "styled-components";
import { getCreateur } from '../../modules/auth';
import Avatar from '../molecules/Avatar';

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
    state={user:{
        username:"",
        password:"",
        email:"",
        presentation:"",
        avatar:""
    }}

    async componentDidMount() {
        this.setState({user: await getCreateur()})
    }

    render(){
        return(
            <Container>

                <center><Avatar src={"http://localhost:8180/public/images/"+this.state.user.avatar}/></center>

                    <Wrapper>
                        <h2>{this.state.user.username}</h2>
                        <p>{this.state.user.presentation}</p>
                    </Wrapper>
                
            </Container>
        )
    }
}

export default Profile;