import styled from "styled-components"
import { connect } from "react-redux"

const Input = styled.input`
    border-radius: ${props => props.borderRadius};
    border: ${props => props.borderSize} solid ${props => props.color};
    color: black;
    padding: 5px;
    margin-bottom: 7px;
    &: hover {
        box-shadow: 0px 1px 5px rgb(47, 29, 8);
    }
    &&: focus {
        box-shadow: 0px 1px 17px rgb(47, 29, 8);
    }
`

const mapStateToProps = state => {
    return {
        borderRadius: state.app.theme.borderRadius,
        borderSize: state.app.theme.borderSize,
        color: state.app.theme.colorText
    }
}

export default connect(mapStateToProps)(Input)
