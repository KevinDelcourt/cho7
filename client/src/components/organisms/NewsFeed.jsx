import styled from "styled-components"
import React from "react"
import { getCreations, getMeilleuresCreations } from "../../modules/api"
import Creation from "../molecules/Creation"
import MainContainer from "../molecules/MainContainer"
import SocialNetwork from "../molecules/SocialNetwork"
import Container from "../atoms/Container/Container"
import StarRating from "../molecules/StarRating"
import StyledLink from "../atoms/Link/Link"
import Title from "../atoms/Title/Title"

const SubContainer = styled.div`
    display: grid;
    grid-row-gap: 20px;
    grid-template-columns: 100%;
`

const ThatContainer = styled.div`
    grid-row: span 2;
    height: max-content;
`

class NewsFeed extends React.Component {
    state = { nouvellesCreations: [], meilleuresCreations: [] }

    async componentDidMount() {
        this.setState({
            nouvellesCreations: await getCreations(),
            meilleuresCreations: await getMeilleuresCreations()
        })
    }

    render() {
        return (
            <ThatContainer>
                <Container>
                    <Title>Dernières créations</Title>
                    <SubContainer>
                        {this.state.nouvellesCreations.map((c, index) => (
                            <MainContainer
                                title={
                                    <StyledLink to={"/creation/" + c.id}>
                                        {c.titre}
                                    </StyledLink>
                                }
                                key={index}>
                                <Creation
                                    creation={c}
                                    path={c.nomfichier}
                                    description={c.description}
                                    valueId={c.id}
                                />
                                <StarRating
                                    creationID={c.id}
                                    noteMoyenne={
                                        c.nbnote === 0
                                            ? 0
                                            : c.sommenotes / c.nbnote
                                    }
                                />
                                <SocialNetwork />
                            </MainContainer>
                        ))}
                    </SubContainer>
                    <Title>Créations les plus écoutées</Title>
                    <SubContainer>
                        {this.state.meilleuresCreations.map((c, index) => (
                            <MainContainer
                                title={
                                    <StyledLink to={"/creation/" + c.id}>
                                        {c.titre}
                                    </StyledLink>
                                }
                                key={index}>
                                <Creation
                                    creation={c}
                                    path={c.nomfichier}
                                    description={c.description}
                                    valueId={c.id}
                                />
                                <StarRating
                                    creationID={c.id}
                                    noteMoyenne={
                                        c.nbnote === 0
                                            ? 0
                                            : c.sommenotes / c.nbnote
                                    }
                                />
                                <SocialNetwork />
                            </MainContainer>
                        ))}
                    </SubContainer>
                </Container>
            </ThatContainer>
        )
    }
}

export default NewsFeed
