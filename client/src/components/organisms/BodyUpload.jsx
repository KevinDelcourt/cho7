import styled from "styled-components";
import React from "react";

const MainContainer = styled.div`
  border-style: dashed;
`;

const LabelInputContainer = styled.div`
  border-style: dashed;
  width: 20px;
  height: 80px;
`;

const LabelSubmitContainer = styled.div`
  border-style: dashed;
  width: 20px;
  height: 80px;
`;

const LabelTextareaContainer = styled.div`
  border-style: dashed;
  width: 20px;
  height: 180px;
`;

const SubmitContainer = styled.div`
  border-style: dashed;
  width: 20px;
  height: 40px;
`;

class BodyUpload extends React.Component {
  render() {
    return (
      <MainContainer>
        <LabelInputContainer />
        <LabelSubmitContainer />
        <LabelTextareaContainer />
        <SubmitContainer />
      </MainContainer>
    );
  }
}

export default BodyUpload;
