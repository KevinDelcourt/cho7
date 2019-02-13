import React, { Component } from 'react';
import './App.css';
import ConnectionPage from './components/pages/ConnectionPage.jsx';
import AccueilPage from './components/pages/AccueilPage';
import UploadPage from './components/pages/UploadPage';
import RenseignerProfilPage from './components/pages/RenseignerProfilPage';

import { BrowserRouter as Router, Route} from "react-router-dom";


class App extends Component {
	render() {
		
		return (
			<Router>
				<div>
					<Route exact path="/" component={AccueilPage} />
                	<Route path="/login" component={ConnectionPage} />
                	<Route path="/upload" component={UploadPage} />
					<Route path="/RenseignerProfilPage" component={RenseignerProfilPage} />

				</div>
			</Router>
		)
	}
}

export default App;
