import styled from "styled-components"
import { connect } from "react-redux"

const Label = styled.label`
    font-family: ${props => props.font};
    color: ${props => props.color};
    margin-bottom: 5px;
`

const mapStateToProps = state => {
    return {
        color: state.app.theme.colorText,
        font: state.app.theme.fontLabel
    }
}

export default connect(mapStateToProps)(Label)
