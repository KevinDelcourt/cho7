import styled from "styled-components"
import { connect } from "react-redux"

const Button = styled.button`
    background-color: ${props => props.bgColor};
    border: ${props => props.borderSize} solid;
    border-radius: ${props => props.borderRadius};
    padding: 5px 15px;
    margin-right: 5px;
    &: hover {
        box-shadow: 0px 1px 4px rgba(0, 0, 0, 0.8);
    }
`

const mapStateToProps = state => {
    return {
        bgColor: state.app.theme.colorContainerBg,
        borderSize: state.app.theme.borderSize,
        borderRadius: state.app.theme.borderRadius
    }
}

export default connect(mapStateToProps)(Button)
