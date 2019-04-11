import styled from "styled-components"
import { connect } from "react-redux"

const Textarea = styled.textarea`
    border-radius: ${props => props.borderRadius};
    border: ${props => props.borderSize} solid ${props => props.color};
    padding: 8px;
    width: 100%;
`

const mapStateToProps = state => {
    return {
        borderRadius: state.app.theme.borderRadius,
        borderSize: state.app.theme.borderSize,
        color: state.app.theme.colorText
    }
}

export default connect(mapStateToProps)(Textarea)
