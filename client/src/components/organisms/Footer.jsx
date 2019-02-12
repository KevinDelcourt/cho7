import styled from "styled-components";
import React, {Component} from 'react';

const FooterDiv = styled.div`
    position:absolute;
    left: 15px;
    right: 15px;
    padding: 30px;
    bottom: 15px;
    font-size: 22px;

    font-family: 'Almendra SC',Arial;
    font-style: normal;
    font-weight: normal;
    line-height: normal;
    text-align: center;

    background: rgba(213, 191, 159, 0.67);
    border-radius: 10px;
`;

const RightDiv = styled.div`
    position: absolute;
    left: 55.81%;
    right: 24.41%;
    top: 24.79%;
    bottom: 24.79%;
`;

const LeftDiv = styled.div`
    position: absolute;
    left: 13.23%;
    right: 46.94%;
    top: 24.79%;
    bottom: 24.79%;
`;

export default class Footer extends Component{
    render(){
        return(
            <FooterDiv>
                <LeftDiv>{this.props.left}</LeftDiv>
                <RightDiv>{this.props.right}</RightDiv>
            </FooterDiv>
        )
    }
}