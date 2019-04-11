import React, { Component } from "react"
import { Field, reduxForm } from "redux-form"
import { required } from "../../modules/validation"
import LabelTextarea from "../molecules/LabelTextarea"
import LabelInput from "../molecules/LabelInput"
import SubmitButton from "../atoms/Button/SubmitButton"
import styled from "styled-components"
import AvatarInput from "../molecules/AvatarInput"
import ColorInput from "../molecules/ColorInput"

class PersonnalisationForm extends Component {
    changeThemeProp = (key, val) => {
        let obj = {}
        obj[key] = val
        this.props.themeAction({
            ...this.props.theme,
            ...obj
        })
    }
    render = () => (
        <form onSubmit={this.props.handleSubmit}>
            <Field
                component={LabelInput}
                name="colorText"
                type="color"
                label="Text color"
                onChange={e =>
                    this.changeThemeProp("colorText", e.target.value)
                }
            />

            <Field
                component={ColorInput}
                name="colorContainerBg"
                label="Container Background"
                onColorChange={e => this.changeThemeProp("colorContainerBg", e)}
            />

            <Field
                component={ColorInput}
                name="colorMenuBarBg"
                label="Menu Bar Background"
                onColorChange={e => this.changeThemeProp("colorMenuBarBg", e)}
            />

            <SubmitButton type="submit" children="Sauvegarder" />
        </form>
    )
}

PersonnalisationForm = reduxForm({
    form: "personnaliser site"
})(PersonnalisationForm)

export default PersonnalisationForm
