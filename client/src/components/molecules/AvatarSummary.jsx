import styled from "styled-components";
import React from "react";
import Avatar from "./Avatar";
import TextareaBase from "../atoms/TextareaBase";
import MainContainer from "./MainContainer";

const Wrapper = styled.div`
  padding-right: 20px;
  width: 503px;
  height: 100%;
`;

class AvatarSummary extends React.Component {
  render() {
    return (
      <MainContainer children={<Wrapper />}>
        <Avatar />
        <MainContainer title="NomCréateur" children={<TextareaBase />} />
      </MainContainer>
    );
  }
}

export default AvatarSummary;
