import styled from "styled-components"
import { connect } from "react-redux"
import { Link } from "react-router-dom"
const ALink = styled(Link)`
    color: ${props => props.color};
    font-family: ${props => props.font};
    transition: all 0.2s ease;

    &:hover {
        filter: invert(100%);
    }
`

const mapStateToProps = state => {
    return {
        font: state.app.theme.fontBase,
        color: state.app.theme.colorText
    }
}

export default connect(mapStateToProps)(ALink)
