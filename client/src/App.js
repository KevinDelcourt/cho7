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

class App extends Component {

	state = { }

	componentDidMount = async () => {
		this.setState({role_createur: await hasRole("CREATEUR"), loaded: true})
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
				<this.PrivateRoute path="/login" component={ConnectionPage} condition={!this.state.role_createur}/>
				<this.PrivateRoute path="/newCreation" component={UploadPage} condition={this.state.role_createur} />
				<this.PrivateRoute path="/updateCreation/:id" component={UpdateCreationPage} condition={this.state.role_createur} />
				<this.PrivateRoute path="/creations" component={MesCreationsPage} condition={this.state.role_createur} />
				<this.PrivateRoute path="/RenseignerProfilPage" component={RenseignerProfilPage} condition={this.state.role_createur} />
			</Fragment>
		</Router>

}

export default App;
