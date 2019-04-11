import React from "react"
import Template from "./Template"
import { getCreation } from "../../modules/api"
import Creation from "./../molecules/Creation"
import MainContainer from "../molecules/MainContainer"
import { Link } from "react-router-dom"

export default class CreationPage extends React.Component {
    state = { creation: [] }

    async componentDidMount() {
        console.log("oui " + this.props.match.params.id)

        this.setState({
            creation: await getCreation(this.props.match.params.id)
        })
        console.log(this.state.creation)
    }

    render() {
        return (
            <Template>
                <MainContainer title={this.state.creation.titre}>
                    <Creation creation={this.state.creation} />
                </MainContainer>
            </Template>
        )
    }
}
