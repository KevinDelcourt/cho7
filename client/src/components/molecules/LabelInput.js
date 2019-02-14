import styled from 'styled-components';
import InputBase from './../atoms/InputBase';
import LabelBase from './../atoms/LabelBase';
import React from 'react';

const LabelInputContainer = styled.div`
    display: grid;
    grid-template-columns: repeat(2, auto);
    grid-column-gap: 8px;
    align-items: center;
    justify-content: start;
`;

class LabelInput extends React.Component{
    render(){
        return(
            <LabelInputContainer>
                <LabelBase children={this.props.label} for={this.props.name} w={this.props.wLabel} />
                <InputBase name={this.props.name} w={this.props.wInput} type={this.props.type} />
            </LabelInputContainer>
        );
    }
}

export default LabelInput;