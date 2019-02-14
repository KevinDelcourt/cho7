import styled from "styled-components";
import React from "react";
import Avatar from "./Avatar";
import TextareaBase from "../atoms/TextareaBase";
import MainContainer from "./MainContainer";
import MediumTitle from "../atoms/MediumTitle";
import { getUser, getCreateur } from "../../modules/auth";

const DescriptionWrapper = styled.div`
  width: 290px;
`;

class AvatarSummary extends React.Component {
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

  render() {
    return (
      <MainContainer>
        {this.state.user.avatar!==""?<Avatar pathImage={"http://localhost:8180/public/images/"+this.state.user.avatar}/>:<span/>}
        <DescriptionWrapper>
          <MediumTitle children={this.state.user.username} />
          <div>{this.state.user.presentation}</div>
        </DescriptionWrapper>
      </MainContainer>
    );
  }
}

export default AvatarSummary;
