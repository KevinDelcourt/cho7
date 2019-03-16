import React, {Component} from 'react'
import { logout } from '../../modules/api'
import { connect } from 'react-redux'
import { bindActionCreators } from 'redux'
import { userLogoutAction } from '../../modules/actionsAndReducers'
import { Redirect } from 'react-router-dom'

class Logout extends Component {
    
    state = {}

    componentDidMount = async() =>
        this.setState({logout: await logout()},()=>{
            this.props.userLogoutAction( this.state.logout)
        })
    
    render = () => this.state.logout?<Redirect to="/" />:""
}

const mapDispatchToProps = (dispatch) => {
    return bindActionCreators({userLogoutAction},dispatch)
}

export default connect(null,mapDispatchToProps)(Logout);