import styled from "styled-components"
import { connect } from "react-redux"
import { Link } from "react-router-dom"
const ALink = styled(Link)`
    color: ${props => props.color};
    font-family: ${props => props.font};
    transition: all 0.2s ease;

    &:hover {
        cursor: pointer;
        color: ${props => props.hovercolor};
    }
`

const mapStateToProps = state => {
    return {
        font: state.app.theme.fontBase,
        color: state.app.theme.colorText,
        hovercolor: state.app.theme.colorSubmitBtn
    }
}

export default connect(mapStateToProps)(ALink)
