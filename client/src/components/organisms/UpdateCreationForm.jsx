import Button from "../atoms/Button/Button"
import LabelTextarea from "../molecules/LabelTextarea"
import styled from "styled-components"
import React from "react"
import LabelInput from "../molecules/LabelInput"
import LabelInputRange from "../molecules/LabelInputRange"
import LabelTextarea from "../molecules/LabelTextarea"
import { getEtatsCreation } from "../../modules/api"
import theme from "./../../theme.json"

const UpdateCreationFormContainer = styled.div`
    display: grid;
    grid-template-rows: repeat(4, auto);
    grid-template-columns: 70%;
    grid-row-gap: 20px;
    justify-content: center;
`

const PublishButtonContainer = styled.div`
    justify-self: end;
`

const StyledButton = styled(Button)`
    background-color: ${theme.color.grey1};
`

class UpdateCreationForm extends React.Component {
    state = { etats: [] }

    async componentDidMount() {
        this.setState({ etats: await getEtatsCreation(this.props.idCreation) })
    }

    render() {
        return (
            <form
                action={
                    "http://localhost:8180/updateCreation/" +
                    this.props.idCreation
                }
                method="post"
                encType="multipart/form-data">
                <UpdateCreationFormContainer>
                    <LabelInput
                        name="titre"
                        label="Titre : *"
                        defaultValue={this.props.titre}
                    />
                    <input
                        type="file"
                        name="creation"
                        accept="audio/mp3, audio/wav"
                    />

                    {this.state.etats.map((e, index) => (
                        <LabelInputRange
                            label={e.libelle}
                            index={index}
                            idEtat={e.id}
                            value={e.valeuravancement}
                            key={index}
                        />
                    ))}

                    <LabelTextarea
                        name="description"
                        label="Description :"
                        row="10"
                        col="20"
                        defaultValue={this.props.desc}
                    />

                    <Field
                        component={LabelInput}
                        name="twitter"
                        type="checkbox"
                        label="Envoyer un tweet"
                    />

                    <PublishButtonContainer>
                        <Button
                            type="submit"
                            children="Modifier"
                            bgColor={theme.color.grey1}
                            bgColorHover={theme.color.grey2}
                        />
                    </PublishButtonContainer>
                </UpdateCreationFormContainer>
            </form>
        )
    }
}

export default UpdateCreationForm
