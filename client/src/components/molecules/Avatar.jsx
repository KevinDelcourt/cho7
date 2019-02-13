import React, { Component } from "react";
import styled from "styled-components";

const AvatarWrapper = styled.div`
  border-radius: 10px;
  border: solid 1px black;
  width: 230px;
  height: 230px;
  margin: 30px;
  width: ${props => props.w}vw;
  height: ${props => props.h}vh;
`;

export default class Avatar extends Component {
  render() {
    return (
      <AvatarWrapper>
        <img src={this.props.pathImage} alt="Avatar" />
      </AvatarWrapper>
    );
  }
}

