import styled from "styled-components";
import React from "react";
import MainContainer from "./MainContainer";
import Creation from "../atoms/Creation";

class Newsfeed extends React.Component {
  render() {
    return (
      <MainContainer title="dernière création">
        <MainContainer title="création1" children={<Creation/>}/>
        <MainContainer title="création2" children={<Creation/>}/>
      </MainContainer>
    );
  }
}

export default Newsfeed;
