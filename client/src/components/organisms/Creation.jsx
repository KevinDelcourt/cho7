import styled from "styled-components";
import React, {Component} from 'react';

export default class Creation extends Component {
    render(){
        return(
            <audio controls>
                <source src="http://localhost:8180/public/audio/oui.mp3" type="audio/mpeg"></source>
            </audio>
        )
    }
}