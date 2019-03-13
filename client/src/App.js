import React, { Component } from 'react';
import './App.css';
import ConnectionPage from './components/pages/ConnectionPage.jsx';
import AccueilPage from './components/pages/AccueilPage';
import UploadPage from './components/pages/UploadPage';
import MesCreationsPage from './components/pages/MesCreationsPage';
import RenseignerProfilPage from './components/pages/RenseignerProfilPage';
import UpdateCreationPage from './components/pages/UpdateCreationPage';

import { BrowserRouter as Router, Route} from "react-router-dom";

class App extends Component {
	render() {
		
		return (
			<Router>
				<div>
					<Route exact path="/" component={AccueilPage} />
                	<Route path="/login" component={ConnectionPage} />
                	<Route path="/newCreation" component={UploadPage} />
					<Route path="/updateCreation/:id" component={UpdateCreationPage} />
					<Route path="/creations" component={MesCreationsPage} />
					<Route path="/RenseignerProfilPage" component={RenseignerProfilPage} />
				</div>
			</Router>
		)
	}
}

export default App;
