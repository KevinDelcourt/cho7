import Container from "./Container"
import styled from "styled-components"
import { connect } from "react-redux"

const LightContainer = styled(Container)`
    background-color: ${props => props.bgColor};
    border-radius: ${props => props.borderRadius};
    border: ${props => props.borderSize} solid ${props => props.color};
    color: ${props => props.color};
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
        borderSize: state.app.theme.borderSize,
        color: state.app.theme.colorText
    }
}

export default connect(mapStateToProps)(LightContainer)
