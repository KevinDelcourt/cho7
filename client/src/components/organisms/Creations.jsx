import React from "react"
import { getCreationsInProgress, getCreations } from "../../modules/api"
import MainContainer from "../molecules/MainContainer"
import { Link } from "react-router-dom"
import { deleteCreation } from '../../modules/api'

class Creations extends React.Component {
    state = { creations: [] }

    async componentDidMount() {
        if (this.props.etat === "wip")
            this.setState({ creations: await getCreationsInProgress() })
        else if (this.props.etat === "done")
            this.setState({ creations: await getCreations() })
    }

    async handleDeleteClick(id) {
        if (await deleteCreation(id))
            window.location.reload()
    }

    render() {
        return (
            <MainContainer title="Mes créations en cours">
                <table>
                    <tbody>
                        <tr>
                            <th>Titre</th>
                            <th />
                            <th />
                        </tr>
                        {this.state.creations.map((c, index) => (
                            <tr key={index}>
                                <td>{c.titre}</td>
                                <td>
                                    <Link to={"/updateCreation/" + c.id}>
                                        Modifier
                                    </Link>
                                </td>
                                <td>
                                    <button class="deleteButton" onClick={() => this.handleDeleteClick(c.id)}>Supprimer</button>
                                </td>
                            </tr>
                        ))}
                    </tbody>
                </table>
            </MainContainer>
        )
    }
}

export default Creations
