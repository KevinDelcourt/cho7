import React from "react"
import styled from "styled-components"
import Label from "../atoms/Label/Label"
import Input from "../atoms/Input/Input"
import theme from "./../../theme.json"

const FieldContainer = styled.div`
    display: grid;
    width: 75%;
`

const LabelInput = props => (
    <div>
        <FieldContainer>
            <Label font={theme.fontFamily.ruluko} children={props.label} />
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
