import styled from "styled-components";
import React from "react";
import Avatar from "./Avatar";
import TextareaBase from "../atoms/TextareaBase";
import MainContainer from "./MainContainer";
import MediumTitle from "../atoms/MediumTitle";

const DescriptionWrapper = styled.div`
  width: 290px;
`;

class AvatarSummary extends React.Component {
  render() {
    return (
      <MainContainer>
        <Avatar />
        <DescriptionWrapper>
          <MediumTitle children="nomcreateur" />
          <TextareaBase />
        </DescriptionWrapper>
      </MainContainer>
    );
  }
}

export default AvatarSummary;
