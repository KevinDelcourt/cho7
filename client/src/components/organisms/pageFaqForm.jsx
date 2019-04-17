import React, { Component } from "react"
import { Field, reduxForm } from "redux-form"
import { required } from "../../modules/validation"
import LabelTextarea from "./../molecules/LabelTextarea"
import LabelInput from "./../molecules/LabelInput"
import Button from "./../atoms/Button/Button"
import theme from "./../../theme.json"
import styled from "styled-components"



class pageFaqForm extends Component {
    render = () => (
        <form onSubmit={this.props.handleSubmit}>
           
                                 
            <Field
                        component={LabelTextarea}
                        name="NouvelleQuestion"
                        label="Question :"
                        row="7"
                        col="50"
                    />
                                         
                <Button
                    type="submit"
                    children="Envoyer Question"
                    bgColor={theme.color.grey1}
                />                
            
        </form>
    )
}

pageFaqForm = reduxForm({
    form: "FAQ"
})(pageFaqForm)

export default pageFaqForm
