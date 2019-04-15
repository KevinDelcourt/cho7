import styled from "styled-components"
import React from "react"
import Template from "./Template"
import NewsFeed from "../organisms/NewsFeed"
import Profile from "../organisms/Profile"
import Projet from "../organisms/Projet"

const AccueilContainer = styled.section`
    display: flex;
`

const Summary = styled.div`
    margin-right: 4vw;
`

const AccueilPage = () => (
    <Template>
        <AccueilContainer>
            <Summary>
                <Projet />
                <Profile />
            </Summary>
            <NewsFeed />
        </AccueilContainer>
    </Template>
)

export default AccueilPage
