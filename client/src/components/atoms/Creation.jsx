import React, { Component } from "react";
import styled from "styled-components";
import { logout, hasRole } from '../../modules/auth';

const Wrapper = styled.div`
  width: 40vw;
`;
const Suprime =styled.div`
display: flex;
justify-content: flex-end;

`;


export default class Creation extends Component {
    state={
		auth:false
    }

    async componentDidMount() {
		this.setState({auth:await hasRole("CREATEUR")})
    }    
   
  render() {
    let conex;
    let path = "http://localhost:8180/public/audio/" + this.props.path;

    if (this.state.auth) {
        conex = <button type="submit" class="far fa-times-circle fa-2x" ></button>;}
    return (
        <form action="http://localhost:8180/suprCreation" method="post" enctype="multipart/form-data">
      <Wrapper>
          
        <audio controls>
          <source src={path} type="audio/mpeg" />
        </audio>
        <div>{this.props.description} </div>
        <Suprime>
        <input type="hidden" name="idCreation" value={this.props.valueId}/>
       {conex}
        </Suprime>   
        
      </Wrapper>
      </form>


      
    );
    
  }
  
}
