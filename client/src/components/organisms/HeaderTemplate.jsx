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
                        <Banniere
                            src={getImageUrl(this.props.banniere)}
                            alt="banniere"
                        />
                    </Link>
                </center>
                <BarreMenu />
            </div>
        )
    }
}

const mapStateToProps = state => {
    return {
        banniere: state.app.theme.banniere
    }
}

export default connect(mapStateToProps)(HeaderTemplate)
