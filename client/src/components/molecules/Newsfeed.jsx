import React from "react";
import MainContainer from "./MainContainer";
import Creation from "../atoms/Creation";
import { getCreations } from "../../modules/auth";

class Newsfeed extends React.Component {
  state = {creations:[]}

  async componentDidMount(){
    this.setState({creations: await getCreations()})
    console.log(this.state.creations)
  }

  render() {
    return (
      <MainContainer title="dernière création">
        {this.state.creations.map((c) =>
          <MainContainer title={c.titre} children={<Creation path={c.nomfichier} description={c.description} valueId={c.id}/>}/>)}
      </MainContainer>
    );
  }
}

export default Newsfeed;
