import styled from "styled-components"
import { connect } from "react-redux"

const Button = styled.button`
    background-color: ${props => props.bgColor};
    border: ${props => props.borderSize} solid ${props => props.color};
    border-radius: ${props => props.borderRadius};
    font-family: ${props => props.font};
    padding: 5px 15px;
    font-size: ${props => props.fontSize};
    color: ${props => props.color};
`

const mapStateToProps = state => {
    return {
        bgColor: state.app.theme.colorContainerBg,
        fontSize: state.app.theme.fontSizeText,
        borderSize: state.app.theme.borderSize,
        borderRadius: state.app.theme.borderRadius,
        color: state.app.theme.colorText,
        font: state.app.theme.fontBase
    }
}

export default connect(mapStateToProps)(Button)
