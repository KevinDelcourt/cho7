import styled from "styled-components"
import Label from "../atoms/Label/Label"
import TextareaBase from "../atoms/Textarea"
import React from "react"

const LabelTextareaContainer = styled.div`
    display: grid;
    grid-template-rows: repeat(2, auto);
    grid-row-gap: 8px;
    align-items: center;
`

class LabelTextarea extends React.Component {
    render() {
        return (
            <LabelTextareaContainer>
                <Label children={this.props.label} />
                <TextareaBase
                    {...this.props.input}
                    rows={this.props.row}
                    cols={this.props.col}
                    name={this.props.name}
                />
                {this.props.meta.error && this.props.meta.touched ? (
                    <div>{this.props.meta.error}</div>
                ) : (
                    ""
                )}
            </LabelTextareaContainer>
        )
    }
}

export default LabelTextarea
