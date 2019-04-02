import React from "react"
import styled from "styled-components"
import LabelBase from "./Label"

const Input = styled.input`
    padding: 6px;
`

const LabelContainer = styled.div`
    display: grid;
    align-items: center;
`

const FieldContainer = styled.div`
    display: grid;
    width: 100%;
`

const FieldConnection = props => (
    <div>
        <LabelContainer>
            <LabelBase>{props.label}</LabelBase>
        </LabelContainer>

        <FieldContainer>
            <Input
                {...props.input}
                type={props.type}
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

export default FieldConnection
