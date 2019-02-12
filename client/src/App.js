import React, { Component } from 'react';
import './App.css';
import ConnectionPage from './components/pages/ConnectionPage.jsx';
import { BrowserRouter as Router, Route, Link } from "react-router-dom";
import AccueilPage from './components/pages/AccueilPage';
import UploadPage from './components/pages/UploadPage';
import MenuButton from './components/atoms/MenuButton';

import { hasRole, logout } from './modules/auth';

class App extends Component {
	state={
		auth:false
	}

	async componentDidMount() {
		this.setState({auth:await hasRole("CREATEUR")})
	}

	render() {
		return (
			<Router>
				<div>
					<Link to="/"> <MenuButton children="Accueil" /> </Link>
					{!this.state.auth?<Link to="/login"> <MenuButton children="Connexion"/> </Link>:<span />}
					{this.state.auth?<Link to="/login" onClick={logout}> <MenuButton children="Déconnexion"/> </Link>:<span />}
					{this.state.auth?<Link to="/upload"> <MenuButton children="Upload"/> </Link>:<span />}

					<hr/>
          
					<Route exact path="/" component={AccueilPage} />
					<Route path="/login" component={ConnectionPage} />
					<Route path="/upload" component={UploadPage} />

				</div>
			</Router>
		)
	}
}

export default App;
