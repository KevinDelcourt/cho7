import React, {Component} from 'react'

export default class Creation extends Component {
    render(){
        let path = "http://localhost:8180/public/audio/" + this.props.path
        return(
            <audio controls>
                <source src={path} type="audio/mpeg"></source>
            </audio>
        )
    }
}