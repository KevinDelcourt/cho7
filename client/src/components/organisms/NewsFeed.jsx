import React from "react"
import { getCreations, getMeilleuresCreations } from "../../modules/api"
import Creation from "../molecules/Creation"
import MainContainer from "../molecules/MainContainer"
import SocialNetwork from "../molecules/SocialNetwork"
import StarRating from "../molecules/StarRating"
import { Link } from "react-router-dom"
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
                        key={index}>
                        <Creation
                            creation={c}
                            path={c.nomfichier}
                            description={c.description}
                            valueId={c.id}
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
                        <SocialNetwork />
                    </MainContainer>
                ))}
            </MainContainer>
        )
    }
}

export default NewsFeed
