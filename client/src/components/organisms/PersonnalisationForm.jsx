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

    getOptions = () => {
        let tab = []
        for (let i = 0; i < 10; i++)
            tab.push(<option value={i + "px"}>{i + "px"}</option>)
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
                {this.getOptions()}
            </Field>
            <SubmitButton type="submit" children="Sauvegarder" />
        </form>
    )
}

PersonnalisationForm = reduxForm({
    form: "personnaliser site"
})(PersonnalisationForm)

export default PersonnalisationForm
