import React from "react"
import Template from "./Template"
import MainContainer from "../molecules/MainContainer"
import {
    getCreation,
    getEtatsCreation,
    postUpdateCreation
} from "../../modules/api"
import UploadForm from "../organisms/UploadForm"
import { Redirect } from "react-router-dom"
import { msgAction } from "../../modules/actionsAndReducers"
import { connect } from "react-redux"
import { bindActionCreators } from "redux"

class UpdateCreationPage extends React.Component {
    state = { redirect: "" }

    async componentDidMount() {
        document.title = "Modifier création"
        let creation = await getCreation(this.props.match.params.id)
        creation.etats = await getEtatsCreation(this.props.match.params.id)
        this.setState({ creation: creation })
    }

    onSubmit = async values => {
        let formData = new FormData()
        formData.append("titre", values.titre)
        formData.append("id", values.id)

        if (values.description)
            formData.append("description", values.description)

        if (values.creation) formData.append("creation", values.creation[0])
        else if (values.etats) {
            for (let [index, etat] of values.etats.entries()) {
                formData.append("libelle[" + index + "]", etat.libelle)
                formData.append("valeur[" + index + "]", etat.valeuravancement)
                formData.append("idEtat[" + index + "]", etat.id)
            }
        }
        if ((await postUpdateCreation(formData)) === true) {
            this.setState({ redirect: <Redirect to="/" /> }, () => {
                this.props.msgAction("Modification effectuée avec succès")
            })
        } else {
            this.props.msgAction("Erreur lors de la modification")
        }
    }

    render() {
        return (
            <Template>
                <MainContainer title="MODIFIER CRÉATION">
                    {this.state.creation ? (
                        <UploadForm
                            onSubmit={this.onSubmit}
                            initialValues={this.state.creation}
                            lock={true}
                        />
                    ) : (
                        ""
                    )}
                </MainContainer>
                {this.state.redirect}
            </Template>
        )
    }
}

const mapDispatchToProps = dispatch => {
    return bindActionCreators({ msgAction }, dispatch)
}

export default connect(
    null,
    mapDispatchToProps
)(UpdateCreationPage)
