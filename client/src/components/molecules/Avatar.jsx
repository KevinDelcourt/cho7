import React, {Component} from 'react';
import CadreAvatar from "../atoms/CadreAvatar";

export default class Avatar extends Component {
    render() {
        return (
            <CadreAvatar w="10" h="10">
                <img width="100%" height="100%" src={this.props.pathImage} alt="Avatar" ></img>
            </CadreAvatar>
        )
    }
}