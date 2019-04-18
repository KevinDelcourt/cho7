import React from "react"
import { Field, reduxForm } from "redux-form"
import { getNomsPlaylist, getNomCreation, ajouterCreationPlaylist, creerPlaylist } from "../../modules/api"
import SubmitButton from "./../atoms/Button/SubmitButton"
import Button from "./../atoms/Button/Button"
import Label from "./../atoms/Label/Label"
import Input from "./../atoms/Input/Input"

class PlaylistForm extends React.Component {
    constructor(props) {
        super(props)
        this.state = {
            optionPlaylist: null,
            optionCreation: null,
            tabAddCreation: [],
            indexMax: 0,
            nouvellePlaylist: false
        }
        this.addPlaylist = this.addPlaylist.bind(this)
        this.addCreation = this.addCreation.bind(this)
        this.removeCreation = this.removeCreation.bind(this)
    }

    async componentDidMount() {
        const nomPlaylist = await getNomsPlaylist()
        const nomCreation = await getNomCreation()
        this.setState({
            optionPlaylist: this.setOptionPlaylist(nomPlaylist),
            optionCreation: this.setOptionCreation(nomCreation)
        })
    }

    setOptionPlaylist(nomPlaylist) {
        let optionTab = []
        nomPlaylist.map(c => optionTab.push(c))
        return optionTab
    }

    setOptionCreation(nomCreation) {
        let optionTab = []
        nomCreation.map(c => optionTab.push(c.titre))
        return optionTab
    }

    addPlaylist(event) {
        this.setState({ nouvellePlaylist: !this.state.nouvellePlaylist })
    }

    async addCreation(event) {
        let newTabCreation = []
        await this.setState({ indexMax: this.state.indexMax + 1 })
        newTabCreation = this.state.tabAddCreation.slice(0)
        let bla = []
        await this.setState({ tabAddCreation: bla })

        newTabCreation.push(this.creation(this.state.indexMax - 1))
        this.setState({ tabAddCreation: newTabCreation })
    }

    async removeCreation(event) {
        let newTab = []
        const numClicked = event.target.id
        this.state.tabAddCreation.map((c, index) => {
            var num = c.props.children[1].props.id.split("-")[1]
            if (numClicked !== num) {
                console.log(num)
                newTab.push(c)
            }
        })

        await this.setState({ tabAddCreation: newTab })
        console.log(this.state.tabAddCreation)
    }

    creation(index) {
        return (
            <div>
                <Field
                    component={Label}
                    htmlFor="InputNomCreation"
                    name={"labelNomCreation-" + index}>
                    Création:
                </Field>

                <Field
                    component={"select"}
                    name={"creation-" + index}
                    id={"creation-" + index}>
                    <option>-- Vide --</option>
                    {this.state.optionCreation
                        ? this.state.optionCreation.map((c, index) => (
                              <option id={index}>{c}</option>
                          ))
                        : null}
                </Field>

                <Button
                    onClick={this.removeCreation}
                    type="button"
                    children="-"
                    id={index}
                />
            </div>
        )
    }

    formNouvellePlaylist() {
        return (
            <>
                <Field
                    component={Label}
                    htmlFor="nouvellePlaylist"
                    name="labelNomNouvellePlaylist">
                    Nom de la Playlist:
                </Field>
                <Field
                    component={Input}
                    type="text"
                    name="InputNomNouvellePlaylist"
                />
            </>
        )
    }

    async ajouter() {
       await ajouterCreationPlaylist();
    }

    creerPlaylist(){

    }

    render() {
        return (
            <>
            <form onSubmit={this.ajouter}>
                <div>
                    <Field
                        component={Label}
                        htmlFor="nomPlaylist"
                        name="labelNomPlaylist">
                        Mes playlists:
                    </Field>

                    <Field
                        name="nomPlaylist"
                        type="text"
                        component={Input}
                        list="playlist"
                    />

                    <Field component={"datalist"} name="playlist" id="playlist">
                        {this.state.optionPlaylist
                            ? this.state.optionPlaylist.map((c, index) => (
                                  <option id={index} value={c.id}>{c.nom}</option>
                              ))
                            : null}
                    </Field>

                    <Button
                        type="button"
                        onClick={this.addCreation}
                        children="+"
                    />

                    {this.state.tabAddCreation}
                </div>

                <SubmitButton type="submit" children="Enregistrer playlist" />
            </form>

            <form onSubmit={this.creerNouvellePlaylist}>
                <div>
                    <Button
                        type="button"
                        onClick={this.addPlaylist}
                        children="NOUVELLE PLAYLIST"
                    />

                </div>

                {this.state.nouvellePlaylist ? (
                    <div>{this.formNouvellePlaylist()}</div>
                ) : null}

                <div>
                    <SubmitButton type="submit" children="Créer playlist" onClick={this.creerPlaylist} />
                </div>              
            </form>
            </>
        )
    }
}

PlaylistForm = reduxForm({
    form: "Créer Playlist"
})(PlaylistForm)

export default PlaylistForm
