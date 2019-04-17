import styled from "styled-components"
import React from "react"
import Template from "./Template"
import { hasRole } from "../../modules/api"
import Creations from "../organisms/Creations"
import MainContainer from "../molecules/MainContainer"
import Link from "../atoms/Link/Link"

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
                        <Creations etat="wip" />
                        <Creations etat="done" />
                    </SubContainer>
                </Template>
            </div>
        )
    }
}

export default MesCreationsPage
