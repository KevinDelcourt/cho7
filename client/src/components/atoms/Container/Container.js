import styled from "styled-components"
import { connect } from "react-redux"

const Container = styled.div`
    background-color: ${props => props.bgColor};
    border-radius: ${props => props.borderRadius};
    border: ${props => props.borderSize} solid;
    padding: 20px 30px;
    width: ${props => props.width || "100%"};
    margin-left: auto;
    margin-right: auto;
`

const mapStateToProps = state => {
    return {
        bgColor: state.app.theme.colorContainerBg,
        borderRadius: state.app.theme.borderRadius,
        borderSize: state.app.theme.borderSize
    }
}

export default connect(mapStateToProps)(Container)
