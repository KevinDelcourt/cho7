import styled from "styled-components"
import React from "react"
import Template from "./Template"
import { hasRole } from "../../modules/api"
import CreationsInProgress from "../organisms/CreationsInProgress"
import CreationsCompleted from "../organisms/CreationsCompleted"
import MainContainer from "../molecules/MainContainer"
import { Link } from "react-router-dom"

const SubContainer = styled.div`
    display: grid;
    grid-row-gap: 20px;
    grid-template-columns: 100%;
`

class MesCreationsPage extends React.Component {
    state = { auth: false, loaded: false }

    async componentDidMount() {
        document.title = "Mes créations"
        this.setState({ auth: await hasRole("CREATEUR") })
        this.setState({ loaded: true })
    }

    render() {
        return (
            <div>
                <Template>
                    <SubContainer>
                        <MainContainer>
                            <center>
                                <Link
                                    to="/newCreation"
                                    style={{ fontSize: 35 + "px" }}>
                                    NOUVELLE CRÉATION
                                </Link>
                            </center>
                        </MainContainer>
                        <CreationsInProgress />
                        <CreationsCompleted />
                    </SubContainer>
                </Template>
            </div>
        )
    }
}

export default MesCreationsPage
