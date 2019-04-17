import React, { Component } from "react"
import styled from "styled-components"
import Label from "../atoms/Label/Label"

const Wrapper = styled.div`
    display: flex;
    flex-direction: column;
    justify-content: space-between;
`

class ThemeImageInput extends Component {
    state = {}

    render = () => {
        delete this.props.input.value
        return (
            <Wrapper>
                <Label>{this.props.label}</Label>
                <input
                    {...this.props.input}
                    type="file"
                    onChange={this.props.changeImage}
                    name={this.props.name}
                />
            </Wrapper>
        )
    }
}

export default ThemeImageInput
