import React from "react"
import MainContainer from "./../molecules/MainContainer"
import Template from "./Template"
import {
    getUser,
    getQuestions,
    postReponse,
    deleteFaq
} from "../../modules/api"
import QuestionReponseForm from "../organisms/QuestionReponseForm"
import { Redirect } from "react-router-dom"
import { SubmissionError } from "redux-form"
import { msgAction } from "../../modules/actionsAndReducers"
import { connect } from "react-redux"
import { bindActionCreators } from "redux"
import styled from "styled-components"
import Collapse from "react-css-collapse"

const QuestionContainer = styled.div`
    cursor: pointer;
    margin: 10px 0;
    border-radius: 10px;
    padding: 8px 10px;
    background: #fff;
    overflow-wrap: break-word;
    display: flex;
    align-items: center;
`

const Question = styled.h3`
    width: 96%;
`

const ReponseContainer = styled(Collapse)`
    padding-left: 30px;
    font-size: 18px;
`

const GridContainer = styled.div`
    display: grid;
    grid-row-gap: 3vh;
`

class ReponseFaqPage extends React.Component {
    state = {
        redirect: "",
        activeIndex: null,
        classIcon: "far",
        questions: [],
        idFaq: null
    }

    async componentDidMount() {
        document.title = "Modifier Profil"
        this.setState({
            user: await getUser(),
            questions: await getQuestions()
        })
    }

    onSubmit = async values => {
        let response = await postReponse(values, this.state.idFaq)
        if (response === true) {
            this.props.msgAction("Reponse envoyé")
            this.setState({ redirect: <Redirect to="/faq" /> })
        } else {
            this.props.msgAction("Erreur lors de la requête REPONSE")
            throw new SubmissionError({ ...response, err: true })
        }
    }

    handleDeleteClick = async id => {
        if (await deleteFaq(id)) {
            this.props.msgAction("Supression effectuée avec succès")
            this.setState({
                redirect: <Redirect to="/reponseFaq" />
            })
        } else this.props.msgAction("Erreur lors de la suppression")
    }

    change = (index, id) => {
        this.setState({
            activeIndex: this.state.activeIndex === index ? null : index
        })
        this.setState({
            idFaq: id
        })
    }

    render = () => (
        <Template>
            <GridContainer>
                <MainContainer title="Dernières questions">
                    {this.state.questions.map((c, index) => (
                        <React.Fragment>
                            <QuestionContainer
                                onClick={() => this.change(index, c.id)}>
                                <Question children={c.question} />
                                <i
                                    className="far fa-times-circle fa-lg"
                                    onClick={() => this.handleDeleteClick(c.id)}
                                />
                                &ensp;
                                <i
                                    className={
                                        (this.state.activeIndex === index
                                            ? "fas"
                                            : "far") + " fa-comment-dots fa-lg"
                                    }
                                />
                            </QuestionContainer>
                            <ReponseContainer
                                transition="height 250ms cubic-bezier(.4, 0, .2, 1)"
                                isOpen={this.state.activeIndex === index}>
                                <QuestionReponseForm
                                    onSubmit={this.onSubmit}
                                    name="reponse"
                                />
                            </ReponseContainer>
                        </React.Fragment>
                    ))}
                </MainContainer>
                {this.state.redirect}
            </GridContainer>
        </Template>
    )
}

const mapDispatchToProps = dispatch => {
    return bindActionCreators({ msgAction }, dispatch)
}

export default connect(
    null,
    mapDispatchToProps
)(ReponseFaqPage)
