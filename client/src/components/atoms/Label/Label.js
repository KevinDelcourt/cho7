import styled from "styled-components"
import { connect } from "react-redux"

const Label = styled.label`
    font-family: ${props => props.font};
    margin-bottom: 5px;
`

const mapStateToProps = state => {
    return {
        font: state.app.theme.fontLabel
    }
}

export default connect(mapStateToProps)(Label)
