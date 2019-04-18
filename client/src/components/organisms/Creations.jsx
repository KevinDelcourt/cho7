import React from "react"
import { getCreationsInProgress, getCreations } from "../../modules/api"
import MainContainer from "../molecules/MainContainer"
import Link from "../atoms/Link/Link"
import { deleteCreation } from "../../modules/api"

class Creations extends React.Component {
    state = { creations: [] }

    async componentDidMount() {
        if (this.props.etat === "wip")
            this.setState({ creations: await getCreationsInProgress() })
        else if (this.props.etat === "done")
            this.setState({ creations: await getCreations("date", "desc") })
    }

    async handleDeleteClick(id) {
        if (await deleteCreation(id)) window.location.reload()
    }

    render() {
        let title = this.props.etat === "wip" ? "en cours" : "terminées"

        return (
            <MainContainer title={"Mes créations " + title}>
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
                                    <Link
                                        class="deleteButton"
                                        to="/creations"
                                        onClick={() =>
                                            this.handleDeleteClick(c.id)
                                        }>
                                        Supprimer
                                    </Link>
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
