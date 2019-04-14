import React from "react"
import styled from "styled-components"
import Label from "../atoms/Label/Label"
import Input from "../atoms/Input/Input"

const FieldContainer = styled.div`
    display: grid;
    width: 75%;
    margin-left: auto;
    margin-right: auto;
`

const LabelInput = props => (
    <div>
        <FieldContainer>
            <Label children={props.label} />
            <Input
                {...props.input}
                type={props.type}
                name={props.name}
                placeholder={props.placeholder}
            />
            {props.meta.error && props.meta.touched ? props.meta.error : ""}
        </FieldContainer>
    </div>
)

export default LabelInput
