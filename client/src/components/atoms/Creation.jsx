import React, { Component } from "react";
import styled from "styled-components";

const Wrapper = styled.div`
  width: 40vw;
`;

export default class Creation extends Component {
  render() {
    let path = "http://localhost:8180/public/audio/" + this.props.path;
    return (
      <Wrapper>
        <audio controls>
          <source src={path} type="audio/mpeg" />
        </audio>
        <div>{this.props.description}</div>
      </Wrapper>
    );
  }
}
