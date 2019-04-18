import { createGlobalStyle } from "styled-components"
import { connect } from "react-redux"
import { getImageUrl } from "./modules/apiURL"

const GlobalStyle = createGlobalStyle`
  body {
    margin: 0;
    padding: 0;
    background: url("${props => {
        if (props.backgroundFile) {
            return URL.createObjectURL(props.backgroundFile)
        } else return getImageUrl(props.background)
    }}");
    background-size: cover;
    background-attachment: fixed;
}

* {
    padding: 0;
    margin: 0;
    text-decoration: none;
    list-style: none;
    box-sizing: border-box;
    border-color:${props => props.color};
    color: ${props => props.color};
    font-family: ${props => props.font};
    font-size: ${props => props.fontSize};
    transition: color 1s ease, background-color 1s ease;
}

table {
    border-collapse: collapse;
    width: 100%;
    background-color: ${props => props.bgColor};
}

td,
th {
    border: ${props => props.borderSize} solid ${props => props.color};
    font-size: ${props => props.fontSizeTitre};
    text-align: center;
    padding: 8px;
}


.deleteButton {
    border: 0;
    font-size: 100%;
    background-color: transparent;
    cursor: pointer;
}


@import url(https://fonts.googleapis.com/css?family=Ruluko);
@import url(//db.onlinewebfonts.com/c/413424b043249d7d2f7c73e3c2d27ffc?family=Sevillana);
@import url(https://fonts.googleapis.com/css?family=Almendra+SC);
`

const mapStateToProps = state => {
    return {
        bgColor: state.app.theme.colorContainerBg,
        color: state.app.theme.colorText,
        fontSize: state.app.theme.fontSizeText,
        fontSizeTitre: state.app.theme.fontSizeTitre,
        font: state.app.theme.fontBase,
        background: state.app.theme.background,
        backgroundFile: state.app.theme.backgroundFile
    }
}

export default connect(mapStateToProps)(GlobalStyle)
