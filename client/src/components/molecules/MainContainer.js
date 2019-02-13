import styled from "styled-components";
import React from 'react';
import LabelBase from "../atoms/LabelBase";

const mainContainerStyle = {
    fontSize: '30px',
    padding: '10px 20px',   
};

class MainContainer extends React.Component{
    render(){
        return(
            <div >
                <LabelBase children={this.props.title} style={mainContainerStyle}/>
                {this.props.children}
            </div>
        );
    }
}

export default MainContainer;