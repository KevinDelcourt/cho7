import React, {Component} from 'react';
import CadreAvatar from "../atoms/CadreAvatar";

export default class Avatar extends React.Component {
    render() {
        return (
            <CadreAvatar w="20" h="20">
                <img width="100%" height="100%" src={this.props.pathImage} alt="Avatar" />
            </CadreAvatar>
        )
    }
}