import styled from "styled-components"
import { connect } from "react-redux"

const Container = styled.div`
    background-color: ${props => props.bgColor};
    border-radius: ${props => props.borderRadius};
    border: ${props => props.borderSize} solid ${props => props.color};
    font-size: ${props => props.fontSize};
    font-family: ${props => props.font};
    color: ${props => props.color};
    padding: 20px 30px;
    box-shadow: ${props => props.boxShadow || "none"};
    width: ${props => props.width || "100%"};
    margin-left: auto;
    margin-right: auto;
`

const mapStateToProps = state => {
    return {
        bgColor: state.app.theme.colorContainerBg,
        borderRadius: state.app.theme.borderRadius,
        borderSize: state.app.theme.borderSize,
        fontSize: state.app.theme.fontSizeText,
        font: state.app.theme.fontBase,
        color: state.app.theme.colorText
    }
}

export default connect(mapStateToProps)(Container)
