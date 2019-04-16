import React from "react"
import MainContainer from "../molecules/MainContainer"
import Template from "./Template"
import {
    hasRole,
    getUser,
    getQuestions,
    getQuestionsReponses,
    postQuestion,
    postReponse,
    deleteFaq
} from "../../modules/api"
import QuestionReponseForm from "../organisms/QuestionReponseForm"
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
    background: #d7d6d6;
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

const GridContainer2 = styled.div`
    display: grid;
    justify-items: center;
    grid-template-columns: repeat(2, auto);
    background-color: #d7d6d6;
    border-radius: 5px;
    padding: 10px;
`

class FaqPage extends React.Component {
    state = {
        auth: false,
        questions: [],
        questionsReponses: [],
        classIcon: "far",
        activeIndex: null,
        activeTab: "question"
    }

    async componentDidMount() {
        document.title = "FAQ"
        this.setState({
            auth: await hasRole("CREATEUR"),
            user: await getUser(),
            questionsReponses: await getQuestionsReponses(),
            questions: await getQuestions()
        })
    }

    onSubmitQuestion = async values => {
        let response = await postQuestion(values)

        if (response === true) {
            this.props.msgAction("Question envoyée")
            this.setState({ questions: await getQuestions() })
        } else {
            this.props.msgAction("Erreur lors de l'envoi'")
            throw new SubmissionError({ ...response, err: true })
        }
    }

    onSubmitReponse = async values => {
        let response = await postReponse(values, this.state.idFaq)

        if (response === true) {
            this.props.msgAction("Réponse envoyée")
            this.setState({
                questions: await getQuestions(),
                questionsReponses: await getQuestionsReponses()
            })
        } else {
            this.props.msgAction("Erreur lors de l'envoi'")
            throw new SubmissionError({ ...response, err: true })
        }
    }

    handleDeleteClick = async id => {
        if (await deleteFaq(id)) {
            this.props.msgAction("Question supprimée")
            this.setState({
                questions: await getQuestions(),
                questionsReponses: await getQuestionsReponses()
            })
        } else this.props.msgAction("Erreur lors de la suppression")
    }

    change = (index, id) => {
        this.setState({
            activeIndex: this.state.activeIndex === index ? null : index,
            idFaq: id
        })
    }

    displayFaq = () => {
        return (
            <>
                <MainContainer title="Posez votre question">
                    <QuestionReponseForm
                        onSubmit={this.onSubmitQuestion}
                        name="question"
                    />
                </MainContainer>

                <MainContainer title="Dernières questions">
                    {this.state.questionsReponses.map((c, index) => (
                        <>
                            <QuestionContainer
                                onClick={() => this.change(index, c.id)}>
                                <Question children={c.question} />
                                {this.displayDeleteButton(c.id)}
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
                                {c.reponse}
                            </ReponseContainer>
                        </>
                    ))}
                </MainContainer>
            </>
        )
    }

    displayQuestions = () => {
        return (
            <MainContainer title="Dernières questions">
                {this.state.questions.map((c, index) => (
                    <>
                        <QuestionContainer
                            onClick={() => this.change(index, c.id)}>
                            <Question children={c.question} />
                            {this.displayDeleteButton(c.id)}
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
                                onSubmit={this.onSubmitReponse}
                                name="reponse"
                            />
                        </ReponseContainer>
                    </>
                ))}
            </MainContainer>
        )
    }

    displayNavBar = () => {
        if (this.state.auth)
            return (
                <GridContainer2>
                    <button
                        to="/faq"
                        onClick={() =>
                            this.setState({
                                activeTab: "question",
                                activeIndex: null
                            })
                        }
                        className="deleteButton">
                        Poser une question
                    </button>
                    <button
                        onClick={() =>
                            this.setState({
                                activeTab: "reponse",
                                activeIndex: null
                            })
                        }
                        className="deleteButton">
                        Repondre aux questions
                    </button>
                </GridContainer2>
            )
    }

    displayDeleteButton = id => {
        if (this.state.auth)
            return (
                <i
                    className="far fa-times-circle fa-lg"
                    onClick={() => this.handleDeleteClick(id)}
                />
            )
    }

    render = () => (
        <Template>
            <GridContainer>
                {this.displayNavBar()}
                {this.state.activeTab === "question"
                    ? this.displayFaq()
                    : this.displayQuestions()}
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
)(FaqPage)
