import Container from "./Container"
import styled from "styled-components"
import { connect } from "react-redux"

const DescriptionContainer = styled(Container)`
    background-color: ${props => props.bgColor || "rgba(145, 109, 67, 0.35)"};
    border-radius: ${props => props.borderRadius || "20px"};
    border-size: ${props => props.borderSize};
    width: ${props => props.width || "100%"};
    margin: 10px 0;
    padding: 5px 10px;
    overflow-wrap: break-word;
`

const mapStateToProps = state => {
    return {
        bgColor: state.app.theme.colorDescriptionBg,
        borderRadius: state.app.theme.borderRadius,
        borderSize: state.app.theme.borderSize
    }
}

export default connect(mapStateToProps)(DescriptionContainer)
