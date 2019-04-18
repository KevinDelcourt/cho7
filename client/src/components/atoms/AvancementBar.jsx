import React from "react"
import { connect } from "react-redux"
import styled from "styled-components"

const Wrapper = styled.div`
    border-radius: ${props => props.borderRadius};
    border: ${props => props.borderSize} solid;
    background-color: ${props => props.bgColor};
    position: relative;
    width: 170px;
    height: auto;
    z-index: 1;
    padding: 5px 10px;
    margin: 10px 0px;
`

const ProgressBar = styled.div`
    border-radius: ${props => props.borderRadius};
    background-color: ${props => props.bgColor};
    width: ${props => props.value}%;
    height: 100%;
    position: absolute;
    top: 0px
    left: 0px;
    z-index: -1;
`

const Label = styled.span`
    z-index: 2;
`

const AvancementBar = props => (
    <Wrapper
        borderRadius={props.borderRadius}
        borderSize={props.borderSize}
        bgColor={props.bgColor}>
        <Label>
            {props.label} : {props.value}%
        </Label>
        <ProgressBar
            value={props.value}
            bgColor={props.color}
            borderRadius={props.borderRadius}
        />
    </Wrapper>
)

const mapStateToProps = state => {
    return {
        borderRadius: state.app.theme.borderRadius,
        borderSize: state.app.theme.borderSize,
        bgColor: state.app.theme.colorDescriptionBg,
        color: state.app.theme.colorSubmitBtn
    }
}

export default connect(mapStateToProps)(AvancementBar)
