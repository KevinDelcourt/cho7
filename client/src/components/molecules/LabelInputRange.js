import React from 'react';
import LabelBase from '../atoms/LabelBase';

class LabelInputRange extends React.Component {
    render(){
        return(
            <div>
                <LabelBase children={this.props.label} />
                <input name={"libelle["+this.props.index+"]"} value={this.props.label} style={{display: "hidden"}} />
                <input type='range' min="0" max="100" step="1" name={"valeur["+this.props.index+"]"} />
            </div>
        );
    }
}

export default LabelInputRange;