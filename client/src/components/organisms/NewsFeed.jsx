import styled from "styled-components"
import React from "react"
import { getCreations } from "../../modules/api"
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
    state = { creations: [] }

    async componentDidMount() {
        this.setState({ creations: await getCreations() })
    }

    render() {
        return (
            <Container>
                <h2>Accueil</h2>
                <SubContainer>
                    {this.state.creations.map((c, index) => (
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
