//@flow
import styled from "styled-components";
import * as React from "react";
import Newsfeed from "../molecules/Newsfeed";
import AvatarSummary from "../molecules/AvatarSummary";
import { type ReactComponentStyled } from "styled-components";

const Wrapper = styled.section`
  border-style: dashed;
  flex-direction: row;
`;

const StyledNewsfeed: ReactComponentStyled<any> = styled(
    Newsfeed
    )`
    border-style: dashed;

    `;

const StyledAvatarSummary: ReactComponentStyled<any> = styled(AvatarSummary)`
  padding-right: 20px;
  width: 503px;
  border-style: dashed;

`;

class MainBody extends React.Component {
  render() {
    return (
      <Wrapper>
        <StyledAvatarSummary />
        <StyledNewsfeed />
      </Wrapper>
    );
  }
}

export default MainBody;
