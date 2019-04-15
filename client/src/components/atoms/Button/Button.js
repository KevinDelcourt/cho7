import styled from "styled-components"
import { connect } from "react-redux"

const Button = styled.button`
    background-color: ${props => props.bgColor};
    border: ${props => props.borderSize} solid;
    border-radius: ${props => props.borderRadius};
    padding: 5px 15px;
`

const mapStateToProps = state => {
    return {
        bgColor: state.app.theme.colorContainerBg,
        borderSize: state.app.theme.borderSize,
        borderRadius: state.app.theme.borderRadius
    }
}

export default connect(mapStateToProps)(Button)
