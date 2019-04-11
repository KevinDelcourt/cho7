import styled from "styled-components"
import { connect } from "react-redux"
import { Link } from "react-router-dom"
const ALink = styled(Link)`
    color: ${props => props.color};
`

const mapStateToProps = state => {
    return {
        color: state.app.theme.colorText
    }
}

export default connect(mapStateToProps)(ALink)
