import React from "react";
import styled from "styled-components";

const AvatarWrapper = styled.div`
  border-radius: 10px;
  border: solid 1px black;
  width: 230px;
  height: 230px;
  margin: 30px;
`;

export default class Avatar extends React.Component {
  render() {
    return (
      <AvatarWrapper>
        <img
          width="100%"
          height="100%"
          src={this.props.pathImage}
          alt="Avatar"
        />
      </AvatarWrapper>
    );
  }
}
