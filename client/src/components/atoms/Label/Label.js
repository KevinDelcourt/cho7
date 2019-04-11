import styled from "styled-components"
import { connect } from "react-redux"

const Label = styled.label`
    font-family: ${props => props.font};
    color: ${props => props.color};
    font-size: ${props => props.fontSize};
    margin-bottom: 5px;
`

const mapStateToProps = state => {
    return {
        color: state.app.theme.colorText,
        fontSize: state.app.theme.fontSizeText,
        font: state.app.theme.fontLabel
    }
}

export default connect(mapStateToProps)(Label)
