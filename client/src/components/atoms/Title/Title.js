import styled from "styled-components"
import { connect } from "react-redux"

const Title = styled.h2`
    font-size: ${props => props.size};
    margin: 15px 0;
`

const mapStateToProps = state => {
    return {
        size: state.app.theme.fontSizeTitre
    }
}

export default connect(mapStateToProps)(Title)
