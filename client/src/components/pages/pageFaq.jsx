import React from "react"
import MainContainer from "./../molecules/MainContainer"
import Template from "./Template"
import { getUser, postProfilCreateur } from "../../modules/api"
import PageFaqForm from "../organisms/pageFaqForm"
import { Redirect } from "react-router-dom"
import { msgAction } from "../../modules/actionsAndReducers"
import { connect } from "react-redux"
import { bindActionCreators } from "redux"
import { SubmissionError } from "redux-form"
import styled from "styled-components"


const Wrapper = styled.div`
    margin: 10px 0;
    padding: 5px 10px;
    background: rgba(255, 255, 255, 0.54);
    border-radius: 10px;
    overflow-wrap: break-word;
    font-family: "Ruluko", Arial, Sans-serif;
`;

class pageFaq extends React.Component {       

    constructor(props){
        super(props);           
        this.shareQuestion = this.shareQuestion.bind(this);        
    }
    
    state = {
        redirect: ""
    }

    async componentDidMount() {
        document.title = "Modifier Profil"
        this.setState({ user: await getUser() })
    }

    onSubmit = async values => {
        
        /*let response = await postProfilCreateur(formData)
        if (response === true) {
            this.props.msgAction("Profil renseigné avec succès")
            this.setState({ redirect: <Redirect to="/" /> })
        } else {
            this.props.msgAction("Erreur lors de la requête")
            throw new SubmissionError({ ...response, err: true })
        }*/
    }
  
    

    shareQuestion(){       
        var shareUrl = "http://localhost:3000/pageFaq";
    }


    render = () => (
        <Template>
            <MainContainer title="Nouvelle Question">
                <PageFaqForm
                    onSubmit={this.onSubmit}
                />             
            </MainContainer>
            <MainContainer title="Derniere Question">
            <Wrapper>
                        <div>dernier question </div>
                        Reponse                         
                        <button onClick={this.shareQuestion}
                         class="far fa-comment-dots fa-lg"></button>       
            </Wrapper>             
            </MainContainer>
            {this.state.redirect}
        </Template>
    )
}

const mapDispatchToProps = dispatch => {
    return bindActionCreators({ msgAction }, dispatch)
}

export default connect(
    null,
    mapDispatchToProps
)(pageFaq)

