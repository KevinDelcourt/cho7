import React, { Component } from "react"
import { Field, reduxForm } from "redux-form"
import { required } from "../../modules/validation"
import Label from "../atoms/Label/Label"
import LabelInput from "../molecules/LabelInput"
import SubmitButton from "../atoms/Button/SubmitButton"
import styled from "styled-components"
import ColorInput from "../molecules/ColorInput"
import DescriptionContainer from "./../atoms/Container/DescriptionContainer"

class PersonnalisationForm extends Component {
    polices = ["Roluko", "Sevillana", "Almendra SC", "Arial", "Comic Sans MS"]

    changeThemeProp = (key, val) => {
        let obj = {}
        obj[key] = val
        this.props.themeAction({
            ...this.props.theme,
            ...obj
        })
    }

    getColorField = (name, label) => (
        <Field
            component={ColorInput}
            name={name}
            label={label}
            onColorChange={e => this.changeThemeProp(name, e)}
        />
    )

    getPxOptions = () => {
        let tab = []
        for (let i = 0; i < 5; i++)
            tab.push(
                <option key={i} value={i + "px"}>
                    {i + "px"}
                </option>
            )
        return tab
    }

    getEmOptions = () => {
        let tab = []
        for (let i = 0; i < 20; i++)
            tab.push(
                <option key={i} value={i / 5 + "em"}>
                    {i / 5 + "em"}
                </option>
            )
        return tab
    }

    getPoliceOptions = () => {
        let tab = []
        this.polices.map((p, i) => {
            tab.push(
                <option key={i} value={p}>
                    {p}
                </option>
            )
        })
        return tab
    }
    render = () => (
        <form onSubmit={this.props.handleSubmit}>
            {this.getColorField("colorText", "Text color")}
            {this.getColorField("colorContainerBg", "Container Background")}
            {this.getColorField("colorMenuBarBg", "Menu Bar Background")}
            {this.getColorField("colorSubmitBtn", "Submit Button Background")}
            {this.getColorField(
                "colorDescriptionBg",
                "Description Container Background"
            )}
            <DescriptionContainer>Description Container</DescriptionContainer>
            <Label>Taille bordure: </Label>
            <Field
                component={"select"}
                name={"borderSize"}
                onChange={e =>
                    this.changeThemeProp("borderSize", e.target.value)
                }>
                {this.getPxOptions()}
            </Field>
            <Label>Rayon bordure: </Label>
            <Field
                component={"select"}
                name={"borderRadius"}
                onChange={e =>
                    this.changeThemeProp("borderRadius", e.target.value)
                }>
                {this.getEmOptions()}
            </Field>
            <Label>Taille police texte: </Label>
            <Field
                component={"select"}
                name={"fontSizeText"}
                onChange={e =>
                    this.changeThemeProp("fontSizeText", e.target.value)
                }>
                {this.getEmOptions()}
            </Field>
            <Label>Taille police titre: </Label>
            <Field
                component={"select"}
                name={"fontSizeTitre"}
                onChange={e =>
                    this.changeThemeProp("fontSizeTitre", e.target.value)
                }>
                {this.getEmOptions()}
            </Field>
            <Label>Taille police grand titre: </Label>
            <Field
                component={"select"}
                name={"fontSizeGrandTitre"}
                onChange={e =>
                    this.changeThemeProp("fontSizeGrandTitre", e.target.value)
                }>
                {this.getEmOptions()}
            </Field>
            <Label>Police texte: </Label>
            <Field
                component={"select"}
                name={"fontBase"}
                onChange={e =>
                    this.changeThemeProp("fontBase", e.target.value)
                }>
                {this.getPoliceOptions()}
            </Field>
            <Label>Police label: </Label>
            <Field
                component={"select"}
                name={"fontLabel"}
                onChange={e =>
                    this.changeThemeProp("fontLabel", e.target.value)
                }>
                {this.getPoliceOptions()}
            </Field>
            <Label>Police grand titre: </Label>
            <Field
                component={"select"}
                name={"fontGrandTitre"}
                onChange={e =>
                    this.changeThemeProp("fontGrandTitre", e.target.value)
                }>
                {this.getPoliceOptions()}
            </Field>

            <SubmitButton type="submit" children="Sauvegarder" />
        </form>
    )
}

PersonnalisationForm = reduxForm({
    form: "personnaliser site"
})(PersonnalisationForm)

export default PersonnalisationForm
