import styled from 'styled-components';
import InputBase from './../atoms/InputBase';
import Label from '../atoms/Label';
import React from 'react';

const LabelInputContainer = styled.div`
    display: grid;
    grid-template-columns: repeat(2, auto);
    grid-column-gap: 8px;
    justify-content: start;
`;

class LabelInput extends React.Component{
    render(){
        return(
            <LabelInputContainer>
                <Label children={this.props.label} for={this.props.name} w={this.props.wLabel}/>
                <InputBase name={this.props.name} defaultValue={this.props.defaultValue} type={this.props.type} onChange={this.props.onChange}/>
            </LabelInputContainer>
        );
    }
}

export default LabelInput;