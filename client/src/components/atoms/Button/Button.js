import styled from "styled-components"
import { connect } from "react-redux"

const Button = styled.button`
    background-color: ${props => props.bgColor};
    border: ${props => props.borderSize} solid ${props => props.color};
    border-radius: ${props => props.borderRadius};
    padding: 5px 15px;
    height: 35px;
    font-size: 18px;
    color: ${props => props.color};
`

const mapStateToProps = state => {
    return {
        bgColor: state.app.theme.colorContainerBg,
        borderSize: state.app.theme.borderSize,
        borderRadius: state.app.theme.borderRadius,
        color: state.app.theme.colorText
    }
}

export default connect(mapStateToProps)(Button)
