import React from "react"
import Banniere from "../atoms/Banniere"
import BarreMenu from "../molecules/BarreMenu.jsx"
import { Link } from "react-router-dom"
import { connect } from "react-redux"
import { getImageUrl } from "../../modules/apiURL"

class HeaderTemplate extends React.Component {
    render() {
        return (
            <div>
                <center>
                    <Link to="/">
<<<<<<< HEAD
                        <Banniere
                            src={
                                this.props.banniereFile
                                    ? URL.createObjectURL(
                                          this.props.banniereFile
                                      )
                                    : getImageUrl(this.props.banniere)
                            }
                            alt="banniere"
                        />
=======
                        <Banniere data-cypress="banierre" src={banniere} alt="banniere" />
>>>>>>> 1b2ed6913e5cd5154e89d3fb1f61f0a9828ed303
                    </Link>
                </center>
                <BarreMenu />
            </div>
        )
    }
}

const mapStateToProps = state => {
    return {
        banniere: state.app.theme.banniere,
        banniereFile: state.app.theme.banniereFile
    }
}

export default connect(mapStateToProps)(HeaderTemplate)
