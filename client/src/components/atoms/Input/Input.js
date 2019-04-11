import styled from "styled-components"
import { connect } from "react-redux"

const Input = styled.input`
    border-radius: ${props => props.borderRadius};
    border: ${props => props.borderSize} solid ${props => props.color};
    padding: 5px;
    margin-bottom: 7px;
`

const mapStateToProps = state => {
    return {
        borderRadius: state.app.theme.borderRadius,
        borderSize: state.app.theme.borderSize,
        color: state.app.theme.colorText
    }
}

export default connect(mapStateToProps)(Input)
