import styled from "styled-components"
import React from "react"
import Template from "./Template"
import { hasRole } from "../../modules/api"
import CreationsInProgress from "../organisms/CreationsInProgress"
import MainContainer from "../molecules/MainContainer"
import { Link } from "react-router-dom"
import theme from "../../theme.json"

const SubContainer = styled.div`
    display: grid;
    grid-row-gap: 20px;
    grid-template-columns: 100%;
`

const StyledLink = styled(Link)`
    &:hover {
        color: #714512;
        text-shadow: 1px 1px black;
    }
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
                                <StyledLink
                                    to="/newCreation"
                                    style={{ fontSize: 35 + "px" }}
                                    children="NOUVELLE CRÉATION"
                                />
                            </center>
                        </MainContainer>
                        <CreationsInProgress />
                    </SubContainer>
                </Template>
            </div>
        )
    }
}

export default MesCreationsPage
