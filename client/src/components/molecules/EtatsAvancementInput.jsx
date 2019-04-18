import React from "react"
import { Field } from "redux-form"
import LabelInput from "./LabelInput"
import Button from "../atoms/Button/Button"
import { required } from "../../modules/validation"

const EtatsAvancementInput = ({ fields, lock }) => (
    <div className="custom-field-array-container">
        {fields.map((code, index) => (
            <div key={index}>
                <Field
                    name={code + ".libelle"}
                    type="text"
                    component={LabelInput}
                    placeholder={"Etat d'avancement " + index + " *"}
                    validate={required}
                />

                <Field
                    name={code + ".valeuravancement"}
                    type="range"
                    component="input"
                />

                <Field name={code + ".id"} type="hidden" component="input" />

                {lock ? (
                    ""
                ) : (
                    <Button type="button" onClick={() => fields.remove(index)} children="-" />
                )}
            </div>
        ))}
        {lock ? (
            ""
        ) : (
            <Button type="button" onClick={() => fields.push()}>
                {!fields.length ? "Création en cours" : " + "}
            </Button>
        )}
    </div>
)

export default EtatsAvancementInput
