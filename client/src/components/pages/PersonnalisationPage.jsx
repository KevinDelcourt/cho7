import React from "react"
import MainContainer from "../molecules/MainContainer"
import Template from "./Template"
import { updateTheme } from "../../modules/api"
import PersonnalisationForm from "../organisms/PersonnalisationForm"
import { Redirect } from "react-router-dom"
import { msgAction, themeAction } from "../../modules/actionsAndReducers"
import { connect } from "react-redux"
import { bindActionCreators } from "redux"
import { SubmissionError } from "redux-form"

class PersonnalisationPage extends React.Component {
    state = {
        redirect: ""
    }

    async componentDidMount() {
        document.title = "Modifier Profil"
    }

    onSubmit = async values => {
        let formData = new FormData()
        for (let key in values) {
            if (key.slice(-4) === "File") {
                formData.append(key, values[key][0])
            } else formData.append(key, values[key])
        }

        this.props.msgAction("Upload en cours...")

        let response = await updateTheme(formData)

        if (response === true) {
            this.props.msgAction("Modification sauvegardée")
            this.setState({ redirect: <Redirect to="/" /> })
        } else {
            this.props.msgAction("Erreur lors de la requête")
            throw new SubmissionError({ ...response, err: true })
        }
    }

    render = () => (
        <Template>
            <MainContainer title="Personnaliser le site">
                {this.props.theme ? (
                    <PersonnalisationForm
                        onSubmit={this.onSubmit}
                        initialValues={this.props.theme}
                        theme={this.props.theme}
                        themeAction={this.props.themeAction}
                    />
                ) : (
                    ""
                )}
            </MainContainer>
            {this.state.redirect}
        </Template>
    )
}

const mapStateToProps = state => {
    return {
        theme: state.app.theme
    }
}

const mapDispatchToProps = dispatch => {
    return bindActionCreators({ msgAction, themeAction }, dispatch)
}

export default connect(
    mapStateToProps,
    mapDispatchToProps
)(PersonnalisationPage)
