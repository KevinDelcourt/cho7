import React from "react"
import { getCreations, getMeilleuresCreations } from "../../modules/api"
import Creation from "../molecules/Creation"
import MainContainer from "../molecules/MainContainer"
import SocialNetwork from "../molecules/SocialNetwork"
import Container from "../atoms/Container/Container"
import StarRating from "../molecules/StarRating"
import Link from "../atoms/Link/Link"
import Title from "../atoms/Title/Title"

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
            <MainContainer title="Dernières créations">
                {this.state.nouvellesCreations.map((c, index) => (
                    <MainContainer
                        title={<Link to={"/creation/" + c.id}>{c.titre}</Link>}
                        width="100%"
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
                                c.nbnote === 0 ? 0 : c.sommenotes / c.nbnote
                            }
                        />
                        <SocialNetwork />
                    </MainContainer>
                ))}
                <Title children="Créations les plus écoutées" />
                {this.state.meilleuresCreations.map((c, index) => (
                    <MainContainer
                        title={<Link to={"/creation/" + c.id}>{c.titre}</Link>}
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
                                c.nbnote === 0 ? 0 : c.sommenotes / c.nbnote
                            }
                        />
                        <SocialNetwork />
                    </MainContainer>
                ))}
            </MainContainer>
        )
    }
}

export default NewsFeed
