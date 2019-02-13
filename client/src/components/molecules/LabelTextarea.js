import LabelBase from './../atoms/LabelBase';
import TextareaBase from './../atoms/TextareaBase';
import React from 'react';

const fontS = {
    fontSize: "20px",
}

class LabelTextarea extends React.Component{
    render(){
        return(
            <div>
                <div style={fontS}>
                    <LabelBase children={this.props.label} />
                </div>
                <TextareaBase rows={this.props.row} cols={this.props.col} />
            </div>
        );
    }
}

export default LabelTextarea;