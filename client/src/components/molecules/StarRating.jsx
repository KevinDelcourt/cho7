import React from "react"
import styled from "styled-components"
import { postStarRating } from "../../modules/api"

const Star = styled.div`
    cursor: pointer;
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
                <span key={i} onClick={() => this.changeStar(i)}>
                    &#9733;
                </span>
            )
        else
            return (
                <span key={i} onClick={() => this.changeStar(i)}>
                    &#9734;
                </span>
            )
    }

    render() {
        let starTab = []
        for (let index = 0; index < 5; index++)
            starTab.push(this.getStar(index + 1, index < this.state.cont))

        return (
            <>
                <Star children={starTab} />
                {Math.floor(this.props.noteMoyenne * 10) / 10}/5
            </>
        )
    }
}

export default StarRating
