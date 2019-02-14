//@flow
import styled from "styled-components";
import * as React from "react";
import Newsfeed from "../molecules/Newsfeed";
import AvatarSummary from "../molecules/AvatarSummary";

const Wrapper = styled.section`
  display:flex;
  flex-direction: row;
`;

class MainBody extends React.Component {
  render() {
    return (
      <Wrapper>
        <AvatarSummary />
        <Newsfeed />
      </Wrapper>
    );
  }
}

export default MainBody;
