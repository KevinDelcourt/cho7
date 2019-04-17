import React, { Component } from "react"
import { Field, reduxForm } from "redux-form"
import Label from "../atoms/Label/Label"
import LabelInput from "../molecules/LabelInput"
import SubmitButton from "../atoms/Button/SubmitButton"
import ColorInput from "../molecules/ColorInput"
import DescriptionContainer from "./../atoms/Container/DescriptionContainer"
import SiteTitle from "../atoms/Title/SiteTitle"
import ThemeImageInput from "../molecules/ThemeImageInput"
import Logo from "../atoms/Logo"
import styled from "styled-components"

const StyledSelect = styled.select`
    margin: 5px;
    color: black;
    &: hover {
        box-shadow: 0px 1px 5px rgb(47, 29, 8);
    }
    &&: focus {
        box-shadow: 0px 1px 17px rgb(47, 29, 8);
    }
`
class PersonnalisationForm extends Component {
    polices = ["Roluko", "Sevillana", "Almendra SC", "Arial", "Comic Sans MS"]

    colorFieldNames = [
        { name: "colorText", label: "Text color" },
        { name: "colorContainerBg", label: "Container Background" },
        { name: "colorMenuBarBg", label: "Menu Bar Background" },
        { name: "colorSubmitBtn", label: "Submit Button Background" },
        {
            name: "colorDescriptionBg",
            label: "Description Container Background"
        }
    ]

    policeFieldNames = [
        { name: "fontBase", label: "Police pricipale" },
        { name: "fontLabel", label: "Police label" },
        { name: "fontGrandTitre", label: "Police grand titre" }
    ]

    fileFields = [
        { name: "backgroundFile", label: "Image de fond" },
        { name: "banniereFile", label: "Image de la bannière" },
        { name: "logoFile", label: "Logo du site" }
    ]
    changeThemeProp = (key, val) => {
        let obj = {}
        obj[key] = val
        this.props.themeAction(obj)
    }

    getColorFields = () => {
        return this.colorFieldNames.map((obj, index) => (
            <Field
                key={index}
                component={ColorInput}
                name={obj.name}
                label={obj.label}
                onColorChange={e => this.changeThemeProp(obj.name, e)}
            />
        ))
    }

    getSelectField = (name, label, options) => {
        return (
            <React.Fragment key={name}>
                <Label>{label}</Label>
                <Field
                    component={StyledSelect}
                    name={name}
                    onChange={e => this.changeThemeProp(name, e.target.value)}>
                    {options}
                </Field>
                <br />
            </React.Fragment>
        )
    }

    getOptions = (start, end, step, string) => {
        let options = []
        for (let i = start; i <= end; i += step)
            options.push(
                <option key={i} value={i + string}>
                    {i + string}
                </option>
            )
        return options
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

    getPoliceOptions = () =>
        this.polices.map((p, i) => (
            <option key={i} value={p}>
                {p}
            </option>
        ))

    render = () => (
        <form onSubmit={this.props.handleSubmit}>
            {this.getColorFields()}
            <DescriptionContainer>Description Container</DescriptionContainer>
            {this.getSelectField(
                "borderSize",
                "Taille Bordure",
                this.getOptions(0, 5, 1, "px")
            )}

            {this.getSelectField(
                "borderRadius",
                "Rayon Bordure",
                this.getOptions(0, 4, 0.5, "em")
            )}

            {this.getSelectField(
                "fontSizeText",
                "Taille police texte",
                this.getOptions(0.96, 1.04, 0.01, "em")
            )}

            {this.getSelectField(
                "fontSizeTitre",
                "Taille police titre",
                this.getOptions(1, 2.5, 0.5, "em")
            )}

            {this.getSelectField(
                "fontSizeGrandTitre",
                "Taille police grand titre",
                this.getOptions(1, 4, 0.5, "em")
            )}

            {this.policeFieldNames.map(obj =>
                this.getSelectField(
                    obj.name,
                    obj.label,
                    this.getPoliceOptions()
                )
            )}

            <Field
                component={LabelInput}
                name="siteTitle"
                label="Titre du site"
                type="text"
                onChange={e =>
                    this.changeThemeProp("siteTitle", e.target.value)
                }
            />

            <SiteTitle />
            <br />

            {this.fileFields.map((field, index) => (
                <Field
                    key={index}
                    component={ThemeImageInput}
                    name={field.name}
                    label={field.label}
                    changeImage={e => {
                        if (e.target.files[0])
                            this.changeThemeProp(field.name, e.target.files[0])
                    }}
                />
            ))}
            <Logo />
            <SubmitButton type="submit" children="Sauvegarder" />
        </form>
    )
}

PersonnalisationForm = reduxForm({
    form: "personnaliser site"
})(PersonnalisationForm)

export default PersonnalisationForm
