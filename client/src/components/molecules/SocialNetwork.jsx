import styled from "styled-components"
import React from "react"
import imgFacebook from "./../../assets/images/facebook2.jpg"
import imgTwitter from "./../../assets/images/twitter.jpg"

const ContainerSocialNetwork = styled.div`
    display: flex;
`

const ShareButton = styled.button`
    position: relative;
    background-color: rgba(0, 0, 0, 0.2);
    width: 40px;
    height: 40px;
    display: flex;
    justify-content: center;
    align-items: center;
    border-radius: 50%;
    overflow: hidden;
    &:hover {
        background-color: #55acee;
    }
`

const ShareButtonFace = styled.button`
    position: relative;
    background-color: rgba(0, 0, 0, 0.2);
    width: 40px;
    height: 40px;
    display: flex;
    justify-content: center;
    align-items: center;
    border-radius: 50%;
    overflow: hidden;
    &:hover {
        background-color: #3b5999;
    }
`

const ImgShare = styled.img`
    width: 30px;
    height: 30px;
    border-radius: 50%;
`

class SocialNetwork extends React.Component {
    constructor(props) {
        super(props)
        this.popupCenter = this.popupCenter.bind(this)
        this.shareFacebook = this.shareFacebook.bind(this)
        this.shareTwitter = this.shareTwitter.bind(this)
    }

    popupCenter(url, title, width, height) {
        var popupWidth = width || 640
        var popupHeight = height || 320
        var windowLeft = window.screenLeft || window.screenX
        var windowTop = window.screenTop || window.screenY
        var windowWidth =
            window.innerWidth || document.documentElement.clientWidth
        var windowHeight =
            window.innerHeight || document.documentElement.clientHeight
        var popupLeft = windowLeft + windowWidth / 2 - popupWidth / 2
        var popupTop = windowTop + windowHeight / 2 - popupHeight / 2
        var popup = window.open(
            url,
            title,
            "scrollbars=yes, width=" +
                popupWidth +
                ", height=" +
                popupHeight +
                ", top=" +
                popupTop +
                ", left=" +
                popupLeft
        )
        popup.focus()
        return true
    }

    shareFacebook() {
        var shareUrl = "https://www.facebook.com/sharer/sharer.php?u="
        this.popupCenter(shareUrl, "Partager sur facebook")
    }

    shareTwitter() {
        var shareUrl =
            "https://twitter.com/intent/tweet?text=" +
            encodeURIComponent(this.props.text) +
            "&via=" +
            encodeURIComponent(this.props.twitterAccount)
        this.popupCenter(shareUrl, "Partager sur Twitter")
    }

    render() {
        return (
            <ContainerSocialNetwork>
                <ShareButtonFace onClick={this.shareFacebook}>
                    <ImgShare src={imgFacebook} alt="Facebook" />
                </ShareButtonFace>

                <ShareButton onClick={this.shareTwitter}>
                    <ImgShare src={imgTwitter} alt="Twitter" />
                </ShareButton>
            </ContainerSocialNetwork>
        )
    }
}

export default SocialNetwork
