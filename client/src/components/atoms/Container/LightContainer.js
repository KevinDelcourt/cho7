import Container from "./Container"
import styled from "styled-components"
import { connect } from "react-redux"

const LightContainer = styled(Container)`
    background-color: ${props => props.bgColor};
    border-radius: ${props => props.borderRadius};
    border-size: ${props => props.borderSize};
    width: auto;
    padding: 5px 1vw;
    display: flex;
    justify-content: space-between;
    margin: 0 2vw;
`

const mapStateToProps = state => {
    return {
        bgColor: state.app.theme.colorMenuBarBg,
        borderRadius: state.app.theme.borderRadius,
        borderSize: state.app.theme.borderSize
    }
}

export default connect(mapStateToProps)(LightContainer)
