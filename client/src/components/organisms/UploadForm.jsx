import styled from "styled-components"
import React from "react"
import LabelInput from "../molecules/LabelInput"
import AudioInput from "../molecules/AudioInput"
import SubmitButton from "../atoms/Button/SubmitButton"
import LabelTextarea from "../molecules/LabelTextarea"
import { Field, reduxForm, FieldArray } from "redux-form"
import { required } from "../../modules/validation"
import EtatsAvancementInput from "../molecules/EtatsAvancementInput"
import MainContainer from "../molecules/MainContainer"

const StyledUploadForm = styled.form`
    display: grid;
    grid-template-rows: repeat(4, auto);
    grid-row-gap: 20px;
    justify-content: center;
    margin: 5%;
`

const Div = styled.div`
    justify-self: end;
`

class UploadForm extends React.Component {
    render() {
        return (
            <MainContainer
                title={
                    this.props.lock ? "MODIFIER CRÉATION" : "NOUVELLE CRÉATION"
                }>
                <StyledUploadForm onSubmit={this.props.handleSubmit}>
                    <Field
                        component={LabelInput}
                        name="titre"
                        type="text"
                        label="Titre *"
                        validate={[required]}
                        dataCypress="titre"
                    />
                    <Field
                        component={AudioInput}
                        name="creation"
                        audio={
                            this.props.initialValues
                                ? this.props.initialValues.nomfichier
                                : ""
                        }
                    />
                    <FieldArray
                        component={EtatsAvancementInput}
                        name="etats"
                        lock={this.props.lock}
                    />
                    <Field
                        dataCypress="description"
                        component={LabelTextarea}
                        name="description"
                        label="Description :"
                        row="10"
                        col="120"
                    />
                    <Field
                        component={LabelInput}
                        dataCypress="inputtweet"
                        name="twitter"
                        type="checkbox"
                        label="Envoyer un tweet"
                    />
                    <Div>
                        <SubmitButton
                            data-cypress="submit"
                            type="submit"
                            children="Publier"
                        />
                    </Div>
                </StyledUploadForm>
            </MainContainer>
        )
    }
}

UploadForm = reduxForm({
    form: "nouvelle création "
})(UploadForm)

export default UploadForm
