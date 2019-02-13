import styled from "styled-components";
import React from "react";

const MainContainer = styled.div`
  height: 100%;
`;

const Avatar = styled.div`
  margin: 0 62px;
  height: 230px;
  width: 230px;
  `;

class AvatarSummary extends React.Component {
  render() {
    return (
      <div>
        <Avatar/>
        <MainContainer />
      </div>
    );
  }
}

export default AvatarSummary;
