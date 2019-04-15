import React, { Component } from "react"
import { Field, reduxForm } from "redux-form"
import { required } from "../../modules/validation"
import LabelTextarea from "../molecules/LabelTextarea"
import Button from "../atoms/Button/Button"
import theme from "./../../theme.json"
import styled from "styled-components"

const StyledButton = styled(Button)`
    justify-self: end;
`

const StyledForm = styled.form`
    display: grid;
    justify-content: center;
    grid-row-gap: 10px;
`

class QuestionReponseForm extends Component {
    render = () => (
        <StyledForm onSubmit={this.props.handleSubmit}>
            <Field
                component={LabelTextarea}
                name={this.props.name}
                row="4"
                col="120"
                validate={[required]}
            />

            <StyledButton
                type="submit"
                children="Envoyer"
                bgColor={theme.colorDescriptionBg}
            />
        </StyledForm>
    )
}

QuestionReponseForm = reduxForm({
    form: "FAQ"
})(QuestionReponseForm)

export default QuestionReponseForm
