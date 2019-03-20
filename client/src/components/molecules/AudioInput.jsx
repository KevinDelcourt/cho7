import React, { Component } from "react"
import { getAudioUrl } from "../../modules/apiURL"

class AudioInput extends Component {
    state = {}
    fileSelect = evt => {
        if (evt.target.files[0]) {
            this.setState({ fichier: evt.target.files[0] })
        }
    }

    render = () => {
        delete this.props.input.value

        let src = ""
        if (this.state.fichier) src = URL.createObjectURL(this.state.fichier)
        else if (this.props.audio) src = getAudioUrl(this.props.audio)

        return (
            <div>
                {src === "" ? (
                    ""
                ) : (
                    <audio controls>
                        <source src={src} type="audio/mpeg" />
                    </audio>
                )}

                <input
                    {...this.props.input}
                    type="file"
                    onChange={this.fileSelect}
                    name={this.props.name}
                />
                {this.props.meta.error && this.props.meta.touched ? (
                    <div>{this.props.meta.error}</div>
                ) : (
                    ""
                )}
            </div>
        )
    }
}

export default AudioInput
