import styled from "styled-components";
import React from "react";

const MainContainer = styled.div`
  border-style: dashed;
  height: 100%;

`;

const MainContainerPost = styled.div`
  border-style: dashed;
  height: 250px;
  margin-bottom:50px;
`;

class Newsfeed extends React.Component {
  render() {
    return (
      <MainContainer>
        <MainContainerPost/>
        <MainContainerPost/>
      </MainContainer>
    );
  }
}

export default Newsfeed;
