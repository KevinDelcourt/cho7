import styled from "styled-components"
import InputBase from "./../atoms/InputBase"
import LabelBase from "./../atoms/LabelBase"
import React from "react"

const LabelInputContainer = styled.div`
    display: grid;
    grid-template-columns: repeat(2, auto);
    grid-column-gap: 8px;
    justify-content: start;
`

class LabelInput extends React.Component {
    render() {
        return (
            <LabelInputContainer>
                <LabelBase children={this.props.label} w={this.props.wLabel} />

                <InputBase
                    {...this.props.input}
                    name={this.props.name}
                    type={this.props.type}
                    placeholder={this.props.placeholder}
                />

                {this.props.meta.error && this.props.meta.touched ? (
                    <div>{this.props.meta.error}</div>
                ) : (
                    ""
                )}
            </LabelInputContainer>
        )
    }
}

export default LabelInput
