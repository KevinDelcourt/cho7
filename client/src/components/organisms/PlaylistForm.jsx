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
            optionTab.push(c.titre)
        ))
        return optionTab;
    }

    addPlaylist(event) {
        this.setState({ nouvellePlaylist: !this.state.nouvellePlaylist });
    }

    addCreation(event) {
        let newTabCreation = [];
        this.state.tabAddCreation.map((c, index) => (
            newTabCreation.push(this.creation(index))
        ));
        newTabCreation.push(this.creation(this.state.tabAddCreation.length));
        this.setState({ tabAddCreation: newTabCreation });
    }

    removeCreation(event) {
        /*let newTab = [];
        
        let i = 0;
        while(i<this.state.tabAddCreation.length) {
            let num = this.state.tabAddCreation[i].props.children[0].props.children.split(" ")[2];
            if( numClicked != num ) {
                newTab.push(this.creation(i));
            }
            i++;
        }*/
        const numClicked = event.target.id;
        this.state.tabAddCreation.remove(numClicked);
        this.setState({ tabAddCreation: this.state.tabAddCreation})
    }

    creation(index) {
        return (
            <div>
                <Field component={Label} htmlFor="InputNomCreation" name={"labelNomCreation-"+index}>
                    {"Création n° "+index}
                </Field>

                <Field
                    name="InputNomCreation"
                    type="text"
                    component={Input}
                    list={"creation-"+index}
                />

                <Field
                    component={"datalist"}
                    name="creation"
                    id={"creation-"+index}
                >
                    {this.state.optionCreation ? (
                        this.state.optionCreation.map((c, index) => (
                            <option id={index}>{c}</option>
                        ))
                    ) : null}
                    <option>{index}</option>
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