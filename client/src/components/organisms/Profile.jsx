import React from "react"
import styled from "styled-components"
import { getCreateur } from "../../modules/api"
import Avatar from "../atoms/Avatar"
import { getImageUrl } from "../../modules/apiURL"
import DescriptionContainer from "./../atoms/Container/DescriptionContainer"
import Container from "../atoms/Container/Container"
import Title from "../atoms/Title/Title"

const Wrapper = styled.div`
    height: max-content;
`

class Profile extends React.Component {
    state = {}

    async componentDidMount() {
        this.setState({ user: await getCreateur() })
    }

    render() {
        if (this.state.user)
            return (
                <Wrapper>
                    <Container>
                        {this.props.about ? <h2>A propos</h2> : ""}
                        <center>
                            <Avatar
                                src={getImageUrl() + this.state.user.avatar}
                            />
                        </center>

                        <DescriptionContainer>
                            <Title>{this.state.user.username}</Title>
                            {this.state.user.presentation}
                        </DescriptionContainer>
                    </Container>
                </Wrapper>
            )
        return ""
    }
}

export default Profile
