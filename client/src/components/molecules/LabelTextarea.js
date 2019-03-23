import styled from 'styled-components';
import Label from '../atoms/Label';
import TextareaBase from './../atoms/TextareaBase';
import React from 'react';

const LabelTextareaContainer = styled.div`
    display: grid;
    grid-template-rows: repeat(2, auto);
    grid-row-gap: 8px;
    align-items: center;
`;

class LabelTextarea extends React.Component{
    render(){
        return(
            <LabelTextareaContainer>
                <Label children={this.props.label} for={this.props.name} />
                <TextareaBase rows={this.props.row} cols={this.props.col} name={this.props.name} defaultValue={this.props.defaultValue} onChange={this.props.onChange} />
            </LabelTextareaContainer>
        );
    }
}

export default LabelTextarea;