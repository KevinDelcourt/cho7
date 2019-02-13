import InputBase from './../atoms/InputBase';
import LabelBase from './../atoms/LabelBase';
import React from 'react';

const fontS = {
    fontSize: "20px",
}

class LabelInput extends React.Component{
    render(){
        return(
            <div style={fontS}>
                <LabelBase children={this.props.label} />
                <InputBase />
            </div>
        );
    }
}

export default LabelInput;