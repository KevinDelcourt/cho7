import React from "react"
import { getCreateur } from "../../modules/api"
import Avatar from "../atoms/Avatar"
import { getImageUrl } from "../../modules/apiURL"
import DescriptionContainer from "./../atoms/Container/DescriptionContainer"
import Container from "../atoms/Container/Container"
import Title from "../atoms/Title/Title"

class Profile extends React.Component {
    state = {}

    async componentDidMount() {
        this.setState({ user: await getCreateur() })
    }

    render() {
        if (this.state.user)
            return (
                <Container>
                    {this.props.about ? <Title children="A propos" /> : ""}
                    <Avatar src={getImageUrl() + this.state.user.avatar} />
                    <DescriptionContainer width="230px">
                        <Title children={this.state.user.username} />
                        <p>{this.state.user.presentation}</p>
                    </DescriptionContainer>
                </Container>
            )
        return ""
    }
}

export default Profile
