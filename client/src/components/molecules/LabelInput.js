import React from "react"
import styled from "styled-components"
import Label from "../atoms/Label/Label"
import theme from "./../../theme.json"

const Input = styled.input`
    padding: 6px;
`

const FieldContainer = styled.div`
    display: grid;
    width: 100%;
    margin-bottom: 7px;
`

const LabelInput = props => (
    <div>
        <Label font={theme.fontFamily.ruluko}>{props.label}</Label>

        <FieldContainer>
            <Input
                {...props.input}
                type={props.type}
                name={props.name}
                placeholder={props.placeholder}
            />
            {props.meta.error && props.meta.touched ? (
                <div>{props.meta.error}</div>
            ) : (
                ""
            )}
        </FieldContainer>
    </div>
)

export default LabelInput
