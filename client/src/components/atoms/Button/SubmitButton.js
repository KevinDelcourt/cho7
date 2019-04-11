import styled from "styled-components"
import { connect } from "react-redux"
import Button from "./Button"

const SubmitButton = styled(Button)`
    background-color: ${props => props.bgColor};
    border: ${props => props.borderSize} solid ${props => props.color};
    border-radius: ${props => props.borderRadius};
    font-size: ${props => props.fontSize};
    font-family: ${props => props.font};
    color: ${props => props.color};
`

const mapStateToProps = state => {
    return {
        bgColor: state.app.theme.colorSubmitBtn,
        fontSize: state.app.theme.fontSizeText,
        font: state.app.theme.fontBase,
        borderSize: state.app.theme.borderSize,
        borderRadius: state.app.theme.borderRadius,
        color: state.app.theme.colorText
    }
}

export default connect(mapStateToProps)(SubmitButton)
