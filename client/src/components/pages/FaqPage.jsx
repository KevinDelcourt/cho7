import React from "react"
import MainContainer from "../molecules/MainContainer"
import Template from "./Template"
import {
    hasRole,
    getUser,
    getQuestionsReponses,
    postQuestion,
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
import { Link } from "react-router-dom"

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

class FaqPage extends React.Component {
    state = {
        auth: false,
        redirect: "",
        activeIndex: null,
        classIcon: "far",
        questionsReponses: []
    }

    async componentDidMount() {
        document.title = "Modifier Profil"
        this.setState({
            auth: await hasRole("CREATEUR"),
            user: await getUser(),
            questionsReponses: await getQuestionsReponses()
        })
    }

    onSubmit = async values => {
        let response = await postQuestion(values)

        if (response === true) {
            this.props.msgAction("message envoyé")
            this.setState({ redirect: <Redirect to="/faq" /> })
        } else {
            this.props.msgAction("Erreur lors de la requête")
            throw new SubmissionError({ ...response, err: true })
        }
    }

    change = index => {
        this.setState({
            activeIndex: this.state.activeIndex === index ? null : index
        })
    }

    handleDeleteClick = async id => {
        if (await deleteFaq(id)) {
            this.props.msgAction("Supression effectuée avec succès")
            this.setState({ redirect: <Redirect to="/faq" /> })
        } else this.props.msgAction("Erreur lors de la suppression")
    }

    displayReponseFaq = () => {
        if (this.state.auth)
            return (
                <MainContainer>
                    <center>
                        <Link to="/reponseFaq" style={{ fontSize: 35 + "px" }}>
                            Repondre aux questions
                        </Link>
                    </center>
                </MainContainer>
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
                {this.displayReponseFaq()}

                <MainContainer title="Posez votre question">
                    <QuestionReponseForm
                        onSubmit={this.onSubmit}
                        name="question"
                    />
                </MainContainer>

                <MainContainer title="Dernières questions">
                    {this.state.questionsReponses.map((c, index) => (
                        <>
                            <QuestionContainer
                                onClick={() => this.change(index)}>
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
)(FaqPage)
