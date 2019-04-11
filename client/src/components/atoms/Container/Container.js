import styled from "styled-components"
import { connect } from "react-redux"

const Container = styled.div`
    background-color: ${props => props.bgColor};
    border-radius: ${props => props.borderRadius};
    border: ${props => props.borderSize} solid ${props => props.color};
    color: ${props => props.color};
    padding: 20px 30px;
    box-shadow: ${props => props.boxShadow || "none"};
    width: ${props => props.width || "100%"};
    margin-left: auto;
    margin-right: auto;
    min-width: 300px;
`

const mapStateToProps = state => {
    return {
        bgColor: state.app.theme.colorContainerBg,
        borderRadius: state.app.theme.borderRadius,
        borderSize: state.app.theme.borderSize,
        color: state.app.theme.colorText
    }
}

export default connect(mapStateToProps)(Container)
