import React from "react"
import Label from "../atoms/Label/Label"
import styled from "styled-components"

class ColorInput extends React.Component {
    state = {
        value: "",
        color: "#FF1000",
        opacity: 0
    }

    componentDidMount = () => {
        console.log(this.props)
        this.rgbaToState(this.props.meta.initial)
    }

    rgbaToState = rgba => {
        let color = "#"
        let opacity
        rgba.slice(5, -1)
            .split(", ")
            .map((val, i) => {
                if (i < 3) color += parseInt(val).toString(16)
                else opacity = parseFloat(val) * 100
            })
        this.setState({ color: color, opacity: opacity })
    }

    getRgbaFromState = () => {
        let r = parseInt(this.state.color.slice(1, 3), 16)
        let g = parseInt(this.state.color.slice(3, 5), 16)
        let b = parseInt(this.state.color.slice(5, 7), 16)
        return (
            "rgba(" +
            r +
            ", " +
            g +
            ", " +
            b +
            ", " +
            this.state.opacity / 100 +
            ")"
        )
    }

    updateOpacity = e => {
        this.setState({ opacity: e.target.value }, () => {
            if (this.props.onColorChange)
                this.props.onColorChange(this.getRgbaFromState())
        })
    }

    updateColor = e => {
        this.setState({ color: e.target.value }, () => {
            if (this.props.onColorChange)
                this.props.onColorChange(this.getRgbaFromState())
            this.props.input.onChange(this.getRgbaFromState())
        })
    }

    render() {
        return (
            <React.Fragment>
                <Label children={this.props.label} />

                <input
                    type="color"
                    value={this.state.color}
                    onChange={this.updateColor}
                />
                <input
                    type="range"
                    value={this.state.opacity}
                    onChange={this.updateOpacity}
                />
                <input
                    type="hidden"
                    {...this.props.input}
                    value={this.getRgbaFromState()}
                />
            </React.Fragment>
        )
    }
}

export default ColorInput
