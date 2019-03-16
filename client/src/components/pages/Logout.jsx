import React, {Component} from 'react'
import { logout } from '../../modules/api'
import { connect } from 'react-redux'
import { bindActionCreators } from 'redux'
import { msgAction } from '../../modules/appMsg'
import { Redirect } from 'react-router-dom'

class Logout extends Component {
    
    state = {}

    componentDidMount = async() =>
        this.setState({logout: await logout()},()=>{
            if(this.state.logout)
                this.props.msgAction("Déconnexion effectuée avec succès")
            else
            this.props.msgAction("Erreur dans la déconnexion")
        })
    
    render = () => this.state.logout?<Redirect to="/" />:""
}

const mapDispatchToProps = (dispatch) => {
    return bindActionCreators({msgAction},dispatch)
}

export default connect(null,mapDispatchToProps)(Logout);