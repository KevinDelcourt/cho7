import React from "react"
import Template from "./Template"
import UploadForm from "../organisms/UploadForm"
import { postNewCreation } from "../../modules/api"
import { Redirect } from "react-router-dom"
import { msgAction } from "../../modules/actionsAndReducers"
import { connect } from "react-redux"
import { bindActionCreators } from "redux"

class UploadPage extends React.Component {
    state = { redirect: "" }
    componentDidMount() {
        document.title = "Importer un fichier"
    }

    submit = async values => {
        let formData = new FormData()
        formData.append("titre", values.titre)
        formData.append("twitter", values.twitter)

        if (values.description)
            formData.append("description", values.description)

        if (values.creation) formData.append("creation", values.creation[0])
        else if (values.etats) {
            for (let [index, etat] of values.etats.entries()) {
                formData.append("libelle[" + index + "]", etat.libelle)
                formData.append("valeur[" + index + "]", etat.valeuravancement)
            }
        }
        if ((await postNewCreation(formData)) === true) {
            this.setState({ redirect: <Redirect to="/" /> }, () => {
                this.props.msgAction("Ajout effectué avec succès")
            })
        } else {
            this.props.msgAction("Erreur lors de l'ajout")
        }
    }

    render() {
        return (
            <div>
                <Template>
                    <UploadForm onSubmit={this.submit} />
                    {this.state.redirect}
                </Template>
            </div>
        )
    }
}

const mapDispatchToProps = dispatch => {
    return bindActionCreators({ msgAction }, dispatch)
}

export default connect(
    null,
    mapDispatchToProps
)(UploadPage)
