import styled from "styled-components"
import { connect } from "react-redux"
import Button from "./Button"

const SubmitButton = styled(Button)`
    background-color: ${props => props.bgColor};
    border: ${props => props.borderSize} solid;
    border-radius: ${props => props.borderRadius};
`

const mapStateToProps = state => {
    return {
        bgColor: state.app.theme.colorSubmitBtn,
        borderSize: state.app.theme.borderSize,
        borderRadius: state.app.theme.borderRadius
    }
}

export default connect(mapStateToProps)(SubmitButton)
