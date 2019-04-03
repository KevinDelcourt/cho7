import React from "react"
import Label from "../atoms/Label/Label"
import styled from "styled-components"

const StyleDivContainer = styled.div`
    display: inline-block;
`

class LabelInputRange extends React.Component {
    render() {
        return (
            <StyleDivContainer>
                <Label children={this.props.label} />
                <input
                    type="hidden"
                    name={"libelle[" + this.props.index + "]"}
                    value={this.props.label}
                />
                <input
                    type="hidden"
                    name={"idEtat[" + this.props.index + "]"}
                    value={this.props.idEtat}
                />
                <input
                    type="range"
                    min="0"
                    max="100"
                    step="1"
                    name={"valeur[" + this.props.index + "]"}
                    defaultValue={this.props.value}
                />
            </StyleDivContainer>
        )
    }
}
LabelInputRange.defaultProps = {
    value: 0
}
export default LabelInputRange
