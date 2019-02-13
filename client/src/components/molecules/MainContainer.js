import styled from "styled-components";
import React from 'react';

const Container = styled.div`
    background: rgba(145, 109, 67, 0.35);
    border-radius: 20px;
    padding: 10px 30px;
    margin:20px;
`

class MainContainer extends React.Component{
    render(){
        return(
            <Container>
                <h1>{this.props.title}</h1>
                {this.props.children}
            </Container>
        );
    }
}

export default MainContainer;