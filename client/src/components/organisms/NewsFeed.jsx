import styled from "styled-components"
import React from "react"
import { getCreations, getMeilleuresCreations } from "../../modules/api"
import Creation from "../molecules/Creation"
import MainContainer from "../molecules/MainContainer"
import SocialNetwork from "../molecules/SocialNetwork"

const SubContainer = styled.div`
    display: grid;
    grid-row-gap: 20px;
    grid-template-columns: 100%;
`

const Container = styled.div`
    grid-row: span 2;
    background: rgba(145, 109, 67, 0.35);
    border-radius: 20px;
    padding: 15px 30px;
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
            <Container>
                <h2>Dernières créations</h2>
                <SubContainer>
                    {this.state.nouvellesCreations.map((c, index) => (
                        <MainContainer title={c.titre} key={index}>
                            <Creation
                                path={c.nomfichier}
                                description={c.description}
                                valueId={c.id}
                            />
                            
                              <SocialNetwork/>
                        </MainContainer>
                    ))}
                </SubContainer>
                <h2>Créations les plus écoutées</h2>
                <SubContainer>
                    {this.state.meilleuresCreations.map((c, index) => (
                        <MainContainer title={c.titre} key={index}>
                            <Creation
                                path={c.nomfichier}
                                description={c.description}
                                valueId={c.id}
                            />
                             <SocialNetwork/>
                        </MainContainer>                        
                    ))}
                </SubContainer>
               
            </Container>
        )
    }
}

export default NewsFeed
