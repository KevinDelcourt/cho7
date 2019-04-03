import React, { Component, Fragment } from 'react';
import './App.css';
import ConnectionPage from './components/pages/ConnectionPage.jsx';
import AccueilPage from './components/pages/AccueilPage';
import UploadPage from './components/pages/UploadPage';
import MesCreationsPage from './components/pages/MesCreationsPage';
import RenseignerProfilPage from './components/pages/RenseignerProfilPage';
import UpdateCreationPage from './components/pages/UpdateCreationPage';
import Logout from './components/pages/Logout'
import { hasRole } from './modules/api'
import { BrowserRouter as Router, Route, Redirect } from "react-router-dom";
import { connect } from 'react-redux'
import { bindActionCreators } from 'redux'
import { userLoginAction } from './modules/actionsAndReducers'

class App extends Component {

	state = { }

	componentDidMount = async () => {
		this.props.userLoginAction(await hasRole("CREATEUR"),true)
		this.setState({loaded: true})
	}

	getRedirect = () => this.state.loaded ? <Redirect to="/" /> : ""

	PrivateRoute = ({ component: Component, condition, ...rest }) => 
		<Route {...rest}
			render={props => condition ? 
				<Component {...props} /> : 
				this.getRedirect()
			}
		/>

	render = ()  => 
		<Router>
			<Fragment>
				<Route exact path="/" component={AccueilPage} />
				<Route path="/logout" component={Logout} />
				<Route path="/accueil" component={this.getRedirect} />
				<this.PrivateRoute path="/login" component={ConnectionPage} condition={!this.props.role_createur}/>
				<this.PrivateRoute path="/newCreation" component={UploadPage} condition={this.props.role_createur} />
				<this.PrivateRoute path="/updateCreation/:id" component={UpdateCreationPage} condition={this.props.role_createur} />
				<this.PrivateRoute path="/creations" component={MesCreationsPage} condition={this.props.role_createur} />
				<this.PrivateRoute path="/RenseignerProfilPage" component={RenseignerProfilPage} condition={this.props.role_createur} />
			</Fragment>
		</Router>

}

const mapStateToProps = (state) => {
    return {
        role_createur: state.app.role_createur
    }
}

const mapDispatchToProps = (dispatch) => {
    return bindActionCreators({userLoginAction},dispatch)
}

export default connect(mapStateToProps,mapDispatchToProps)(App)
