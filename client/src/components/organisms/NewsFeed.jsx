import React from "react"
import { getCreations } from "../../modules/api"
import Creation from "../molecules/Creation"
import MainContainer from "../molecules/MainContainer"
import SocialNetwork from "../molecules/SocialNetwork"
import StarRating from "../molecules/StarRating"
import Link from "../atoms/Link/Link"
import Label from "../atoms/Label/Label"
import styled from "styled-components"
import { connect } from "react-redux"

const SelectContainer = styled.div`
    margin-bottom: 15px;
`

class NewsFeed extends React.Component {
    state = {
        creations: []
    }

    async componentDidMount() {
        this.setState({
            creations: await getCreations("date", "asc")
        })
    }

    handleChange = async e => {
        let value = e.target.value.split(",")

        this.setState({
            creations: await getCreations(value[0], value[1])
        })
    }

    render() {
        return (
            <MainContainer title="Dernières créations">
                <SelectContainer>
                    <Label children="Trier par : " />
                    <select
                        onChange={this.handleChange}
                        style={{ backgroundColor: this.props.bgColor }}>
                        <option value="date,asc">Plus récents</option>
                        <option value="date,desc">Plus anciens</option>
                        <option value="titre,asc">Titre A -> Z</option>
                        <option value="titre,desc">Titre Z -> A</option>
                        <option value="note,desc">Mieux notés</option>
                        <option value="note,asc">Moins bien notés</option>
                        <option value="ecoute,desc">Plus écoutés</option>
                        <option value="ecoute,asc">Moins écoutés</option>
                    </select>
                </SelectContainer>

                {this.state.creations.map((c, index) => (
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
            </MainContainer>
        )
    }
}

const mapStateToProps = state => {
    return {
        bgColor: state.app.theme.colorDescriptionBg,
        borderRadius: state.app.theme.borderRadius,
        borderSize: state.app.theme.borderSize
    }
}

export default connect(mapStateToProps)(NewsFeed)
