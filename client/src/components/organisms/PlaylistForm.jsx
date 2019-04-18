import React from "react";
import { Field, reduxForm } from "redux-form";
import {getNomsPlaylist, getNomCreation } from "../../modules/api";
import SubmitButton from "./../atoms/Button/SubmitButton";
import Button from "./../atoms/Button/Button";
import Label from "./../atoms/Label/Label";
import Input from "./../atoms/Input/Input";

class PlaylistForm extends React.Component {

    constructor(props){
        super(props);
        this.state = {
            optionPlaylist: null,
            optionCreation: null,
            tabAddCreation: [],
            nouvellePlaylist: false
        }
        this.addPlaylist = this.addPlaylist.bind(this);
        this.addCreation = this.addCreation.bind(this);
        this.removeCreation = this.removeCreation.bind(this);
    }
    
    async componentDidMount() {
        const nomPlaylist = await getNomsPlaylist();
        const nomCreation = await getNomCreation();
        this.setState({
            optionPlaylist: this.setOptionPlaylist(nomPlaylist),
            optionCreation: this.setOptionCreation(nomCreation)
        });
    }

    setOptionPlaylist(nomPlaylist) {
        let optionTab = [];
        nomPlaylist.map((c) => (
            optionTab.push(c.nom)
        ))
        return optionTab;
    }

    setOptionCreation(nomCreation) {
        let optionTab = [];
        nomCreation.map((c) => (
            optionTab.push(c)
        ))
        return optionTab;
    }

    addPlaylist(event) {
        this.setState({ nouvellePlaylist: !this.state.nouvellePlaylist });
    }

    async addCreation(event) {
        let newTabCreation = this.state.tabAddCreation.slice(0);
        let dernier = this.creation(newTabCreation.length);
        newTabCreation.push(dernier);
        await this.setState({ tabAddCreation: newTabCreation });
    }

    async removeCreation(event) {
        const numClicked = event.target.id;
        let newTab = this.state.tabAddCreation.slice(0);
        newTab.splice(numClicked, 1);
        await this.setState({ tabAddCreation: newTab })
    }

    creation(index) {
        return (
            <div>
                <Field component={Label} htmlFor="InputNomCreation" name={"labelNomCreation-"+index}>
                    Création: 
                </Field>

                <Field
                    component={"select"}
                    name={"creation-"+index}
                    id={"creation-"+index}
                >
                    <option value="vide">-- Vide --</option>
                    {this.state.optionCreation ? (
                        this.state.optionCreation.map((c, index) => (
                            <option value={c.id}>{c.titre}</option>
                        ))
                    ) : null}
                </Field>

                <Button onClick={this.removeCreation} type="button" children="-" id={index}/>
            </div>
        )
    }

    formNouvellePlaylist() {
        return(
            <>
                <Field component={Label} htmlFor="nouvellePlaylist" name="labelNomNouvellePlaylist">Nom de la Playlist:</Field>
                <Field component={Input} type="text" name="InputNomNouvellePlaylist" />
            </>
        )
    }

    submit() {

    }

    render(){
        return(
            <form onSubmit={this.submit}>
                <div>
                    <Field component={Label} htmlFor="nomPlaylist" name="labelNomPlaylist">
                        Mes playlists:
                    </Field>

                    <Field
                        name="nomPlaylist"
                        type="text"
                        component={Input}
                        list="playlist"
                    />

                    <Field
                        component={"datalist"}
                        name="playlist"
                        id="playlist"
                    >
                        {this.state.optionPlaylist ? (
                            this.state.optionPlaylist.map((c, index) => (
                                <option id={index}>{c}</option>
                            ))
                        ) : null}
                    </Field>

                    <Button type="button" onClick={this.addCreation} children="+" />
                    {//ici
                    }

                    { this.state.tabAddCreation }
                </div>
                
                <div>
                    <Button type="button" onClick={this.addPlaylist} children="NOUVELLE PLAYLIST" />
                </div>
                
                {this.state.nouvellePlaylist ?
                    (
                        <div>
                            { this.formNouvellePlaylist() }
                        </div>
                    ):null
                }

                <SubmitButton type="submit" children="Enregistrer playlist" />
            </form>
        )
    }
}

PlaylistForm = reduxForm({
    form: "Créer Playlist"
})(PlaylistForm);

export default PlaylistForm;