import React, {Component} from 'react';
import MenuButton from './MenuButton';

class MenuLoginButton extends React.Component {
    constructor(props) {
        super(props);
        this.state = {clicked: false};
        this.changeLabel = this.changeLabel.bind(this);
        this.label = "Connection";
    }

    changeLabel() {
        this.setState( (state) => (
            {clicked: !state.clicked}
        ));
        if(this.state.clicked){
            this.label = this.props.fstClick;
        }else{
            this.label = this.props.sndClick;
        }
    }

    render() {
        return(
            <MenuButton children={this.label} onClick={this.changeLabel} />
        );
    }
}

export default MenuLoginButton;