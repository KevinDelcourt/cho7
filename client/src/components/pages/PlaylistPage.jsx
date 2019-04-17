import React from "react"
import Template from "./Template"
import MainContainer from "../molecules/MainContainer"
import { hasRole,
    getNomsPlaylist,
    getCreationsToPlaylist,
    getNomCreation,
    ajoutEcoute} from "../../modules/api"
import { getAudioUrl } from "../../modules/apiURL"
import AudioPlayer from "react-modular-audio-player"
import styled from "styled-components"
import SubmitButton from "./../atoms/Button/SubmitButton"
import { Field, reduxForm } from "redux-form"

const StyledContainer = styled.div`
    display: grid;
    grid-row-gap: 20px;
    grid-template-columns: 100%;
`;

const StyledLinkContainer = styled.div`
    font-size: 25px;
`;

const Label = styled.label `
    text-shadow: 0px 1px 4px rgb(75, 75, 75);
    color: rgb(200, 200, 200)
`;

let rearrangedPlayer = [
    {
        className: "tier-top",
        style: { margin: "0.3rem" },
        innerComponents: [
            {
                type: "play",
                style: { width: "fit-content" }
            },
            {
                type: "forward",
                style: { width: "fit-content" }
            },
            {
                type: "loop",
                style: { width: "fit-content" }
            },
            {
                type: "name",
                style: { width: "fit-content" }
            },
            {
                type: "volume"
            }
        ]
    },
    {
        className: "tier-bottom",
        style: { margin: "0rem 0.3rem 0.3rem 0.3rem" },
        innerComponents: [
            {
                type: "time",
                style: { width: "fit-content" }
            },
            {
                type: "seek"
            }
        ]
    }
]

class Playlist extends React.Component {
    constructor(props){
        super(props)
        this.state = {
            playlist: "",
            creations: [],
            playlistInformations: [{}],
            lienCreation: [],
            indexCurrentCreation: 0
        }
        this.changeCurrentIndex = this.changeCurrentIndex.bind(this)
        const rap = null;
    }

    async componentDidMount() {
        this.setState({
            creations: await getCreationsToPlaylist(this.props.nom)
        })
        this.setPlaylistInformations();
        this.setLienPlaylist(this.state.indexCurrentCreation);
        this.setPlaylist();
    }

    setPlaylistInformations() {
        const path = getAudioUrl();
        const playerInfo = [];
        this.state.creations.map(c => (
            playerInfo.push({
                src: path + c.nomfichier,
                title: c.nbecoute + " écoutes",
                artist: c.titre
            })
        ))
        this.setState({ playlistInformations: playerInfo })
    }

    setLienPlaylist(indexSurbrillance) {
        const liens = [];
        this.state.creations.map((c, index) => (
            liens.push(
                <StyledLinkContainer>
                    <button className={"far fa-play-circle " + index + " deleteButton"} onClick={this.changeCurrentIndex} />
                    {index==indexSurbrillance ? (
                        <Label children={c.titre} />
                    ):(
                        <label>{c.titre}</label>
                    )}
                </StyledLinkContainer>)
        ))
        this.setState({ lienCreation: liens })
    }

    setPlaylist(){
        this.setState({
            playlist: <div id={this.props.numPlaylist}><AudioPlayer
                audioFiles={this.state.playlistInformations}
                iconSize="2rem"
                fontSize="1rem"
                playerWidth="40rem"
                rearrange={rearrangedPlayer}
                ref={element => {
                    this.rap = element
                }}
            /></div>
        })
        this.rap.audioRef.addEventListener("loadeddata", e => {
            this.setState({ indexCurrentCreation: ((this.state.indexCurrentCreation + 1) % this.state.playlistInformations.length) })
            this.setLienPlaylist(this.state.indexCurrentCreation);
        })
        this.setState({ indexCurrentCreation: (this.state.indexCurrentCreation - 1)  })
        this.setLienPlaylist(this.state.indexCurrentCreation);
    }

    changeCurrentIndex(event){
        const indexClicked = event.target.className.split(" ")[2]
        this.setState({ indexCurrentCreation: indexClicked})
        this.playCreation(indexClicked);
        this.setLienPlaylist(indexClicked);
    }

    async playCreation(indexClicked){
        let srcClicked = this.state.playlistInformations[indexClicked].src;
        let subSrcAudio = this.rap.audioRef.src;
        if (!this.compareString(srcClicked, subSrcAudio)) {
            let subSrcAudio = this.changeOrderArray(indexClicked, this.state.playlistInformations)
            await this.setState({playlist: null});
            await this.setState({
                playlist: <div id={this.props.numPlaylist}><AudioPlayer
                    audioFiles={subSrcAudio}
                    iconSize="2rem"
                    fontSize="1rem"
                    playerWidth="40rem"
                    playIcon=""
                    rearrange={rearrangedPlayer}
                    ref={element => {
                        this.rap = element
                    }}
                /></div>
            })
            this.rap.audioRef.addEventListener("loadeddata", e => {
                this.setState({ indexCurrentCreation: ((this.state.indexCurrentCreation + 1) % this.state.playlistInformations.length) })
                this.setLienPlaylist(this.state.indexCurrentCreation);
            })
            this.setState({ indexCurrentCreation: (this.state.indexCurrentCreation - 1)  })
            this.setLienPlaylist(this.state.indexCurrentCreation);
        }
    }

    compareString(strSrcClicked, strSrcAudio) {
        strSrcAudio = decodeURI(strSrcAudio)
        if(strSrcClicked.length!==strSrcAudio.length){
            return false;
        }

        let indexStr = 0;
        while(strSrcClicked.charAt(indexStr)===strSrcAudio.charAt(indexStr) && indexStr<strSrcClicked.length){
            indexStr++;
        }
        return indexStr===strSrcClicked.length;
    }

    changeOrderArray(index, array){
        let subArray = array.slice(0, index);
        let secondSubArray = array.slice(index);
        let newArrayOrdered = secondSubArray.concat(subArray);
        return newArrayOrdered;
    }

    render() {
        return(
            <MainContainer title={this.props.nom}>
                {this.state.playlist}
                {this.state.lienCreation}
            </MainContainer>
        )
    }
}


/**----------------------------------------------------------------------------------------------------**/


export default class Playlists extends React.Component {
    constructor(props){
        super(props)
        this.state = {
            auth: false,
            nomsPlaylist: [],
            nomsCreation: [],
            nouvellePlaylist: "",
            showForm: false,
            playlistDatalist: null
        }
        this.showPlaylist = this.showPlaylist.bind(this)
    }

    async componentDidMount(){
        this.setState({
            auth: await hasRole("CREATEUR"),
            nomsPlaylist: await getNomsPlaylist(),
            nomsCreation: await getNomCreation()
        })
    }

    showPlaylist(event){
        this.setState({ showForm: !this.state.showForm});
        this.setDatalist();
    }

    setDatalist(){
        const datalist = <datalist id="playlists">
            {this.state.nomsPlaylist.map((c, index) => (
                <option value={c.nom} />
            ))}
        </datalist>
        this.setState({playlistDatalist: datalist})
    }

    render(){
        return(
            <Template>
                <StyledContainer>
                    {this.state.auth?(
                            <center>
                                <label onClick={this.showPlaylist}>
                                    <MainContainer>NOUVELLE PLAYLIST</MainContainer>
                                </label>
                            </center>
                        ):null
                    }
                    {this.state.showForm ? (
                    <MainContainer>
                        <form onSubmit={this.submit}>
                            <label>Noms des playlists: </label>
                            <input list="playlists" name="playlist" />
                            {this.state.playlistDatalist}

                            <label>Tite des creations: </label>
                            <input list="nomcreation" />
                            <datalist id="nomcreation">
                                {this.state.nomsCreation.map((c, index) => (
                                    <option value={c.titre} />
                                ))}
                            </datalist>

                            <SubmitButton type="submit" children="Enregistrer playlist" />
                        </form>
                    </MainContainer>
                    ):null}

                    <MainContainer title="Mes playlists">
                        {this.state.nomsPlaylist.map((noms, index) => (
                            <StyledContainer>
                                <Playlist nom={noms.nom} numPlaylist={noms.id}/>
                            </StyledContainer>
                        ))}
                    </MainContainer>
                </StyledContainer>
            </Template>
        )
    }
}
