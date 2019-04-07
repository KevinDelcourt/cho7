import React, { Component } from "react"
import { Field, reduxForm } from "redux-form"
import { required } from "../../modules/validation"
import LabelTextarea from "./../molecules/LabelTextarea"
import LabelInput from "./../molecules/LabelInput"
import Button from "./../atoms/Button/Button"
import theme from "./../../theme.json"
import styled from "styled-components"
import AvatarInput from "../molecules/AvatarInput"

const Cadre = styled.div`
    display: flex;
    justify-content: space-around;
    align-items: center;
    padding: 7vh 4vw;
    height: 70vh;
`

const FormContainer = styled.div`
    display: flex;
    justify-content: space-around;
    flex-direction: column;
    height: 50vh;
    min-width: 35vw;
`

const RightColumn = styled.div`
    display: flex;
    height: 100%;
    justify-content: space-between;
    flex-direction: column;
`

class RenseignerProfilForm extends Component {
    render = () => (
        <form onSubmit={this.props.handleSubmit}>
            <Cadre>
                <FormContainer>
                    <Field
                        component={LabelInput}
                        name="username"
                        type="text"
                        label="Pseudo *"
                        wInput="25"
                        validate={[required]}
                    />

                    <Field
                        component={LabelInput}
                        name="password"
                        type="password"
                        label="Mot de passe *"
                        wInput="25"
                    />

                    <Field
                        component={LabelInput}
                        name="email"
                        type="text"
                        label="Mail *"
                        wInput="25"
                        validate={[required]}
                    />

                    <Field
                        component={LabelTextarea}
                        name="presentation"
                        label="Description :"
                        row="7"
                        col="50"
                    />
                </FormContainer>
                <RightColumn>
                    <Field
                        component={AvatarInput}
                        name="fichierAvatar"
                        avatar={this.props.initialValues.avatar}
                    />

                    <Button
                        type="submit"
                        children="Modifier Profil"
                        bgColor={theme.color.grey1}
                        bgColorHover={theme.color.grey2}
                    />
                </RightColumn>
            </Cadre>
        </form>
    )
}

RenseignerProfilForm = reduxForm({
    form: "renseigner profil"
})(RenseignerProfilForm)

export default RenseignerProfilForm
