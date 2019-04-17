import React, { Fragment } from "react"
import { postStarRating } from "../../modules/api"
import styled from "styled-components"

const Star = styled.span`
    color: #fcde96;
    &: hover {
        text-shadow: 0px 1px 4px rgb(255, 255, 255);
    }
`

class StarRating extends React.Component {
    constructor(props) {
        super(props)
        this.changeStar = this.changeStar.bind(this)
        this.state = {
            cont: 0
        }
    }

    changeStar(c) {
        this.setState({ cont: c }, () => {
            postStarRating(this.props.creationID, { star: this.state.cont })
        })
    }

    getStar = (i, coche) => {
        if (coche)
            return (
                <Star
                    key={i}
                    onClick={() => this.changeStar(i)}
                    children="&#9733;"
                />
            )
        else
            return (
                <Star
                    key={i}
                    onClick={() => this.changeStar(i)}
                    children="&#9734;"
                />
            )
    }

    render() {
        let starTab = []
        for (let index = 0; index < 5; index++)
            starTab.push(this.getStar(index + 1, index < this.state.cont))

        return (
            <Fragment>
                {starTab}
                {this.state.cont !== 0 ? this.state.cont : ""} /5 <br />
                {Math.floor(this.props.noteMoyenne * 10) / 10}/5
            </Fragment>
        )
    }
}

export default StarRating
