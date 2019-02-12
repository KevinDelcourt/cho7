import React, { Component } from 'react';
import './App.css';
import BarreMenu from './components/molecules/BarreMenu';
import ConnectionPage from './components/pages/ConnectionPage.jsx';
import AccueilPage from './components/pages/AccueilPage';
import UploadPage from './components/pages/UploadPage';

import { BrowserRouter as Router, Route} from "react-router-dom";


class App extends Component {

	render() {
		return (
			<Router>
				<div>
					<BarreMenu />
					<Route exact path="/" component={AccueilPage} />
                	<Route path="/login" component={ConnectionPage} />
                	<Route path="/upload" component={UploadPage} />
				</div>
			</Router>
		)
	}
}

export default App;
