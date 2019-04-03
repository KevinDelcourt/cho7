import Avatar from "./../molecules/Avatar"
import React, { Component } from "react"
import { getImageUrl } from "../../modules/apiURL"
import styled from "styled-components"

const AvatarContainer = styled.div`
    display: flex;
    flex-direction: column;
    justify-content: space-between;
    width: 20vw;
    height: 45vh;
`

class AvatarInput extends Component {
    state = {}
    fileSelect = evt => {
        if (evt.target.files[0]) {
            this.setState({ fichier: evt.target.files[0] })
        }
    }

    render = () => {
        delete this.props.input.value
        return (
            <AvatarContainer>
                <Avatar
                    src={
                        this.state.fichier
                            ? URL.createObjectURL(this.state.fichier)
                            : getImageUrl(this.props.avatar)
                    }
                />
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
            </AvatarContainer>
        )
    }
}

export default AvatarInput
