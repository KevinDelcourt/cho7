import React from 'react';
import Label from '../atoms/Label';
import styled from "styled-components";

const styleDivContainer = styled.div`
    display: inline-block;
`;

class LabelInputRange extends React.Component {
    render(){
        return(
            <styleDivContainer>
                <Label children={this.props.label} />
                <input name={"libelle["+this.props.index+"]"} value={this.props.label} style={{display: "none"}} />
                <input type='range' min="0" max="100" step="1" name={"valeur["+this.props.index+"]"} defaultValue="0"/>
            </styleDivContainer>
        );
    }
}

export default LabelInputRange;