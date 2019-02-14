import styled from "styled-components";
import React from 'react';

const Container = styled.div`
    background: rgba(145, 109, 67, 0.35);
    border-radius: 20px;
    padding: 15px 30px;
`

class MainContainer extends React.Component{
    render(){
        return(
            <Container>
                <h2>{this.props.title}</h2>
                {this.props.children}
            </Container>
        );
    }
}

export default MainContainer;