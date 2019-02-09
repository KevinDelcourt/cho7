import React from 'react';
import ReactDOM from 'react-dom';
import './index.css';
import App from './App';
import * as serviceWorker from './serviceWorker';
import { AxiosTestPost,AxiosTestGet } from './components/AxiosTest';

ReactDOM.render(<div><AxiosTestPost /><AxiosTestGet/></div>, document.getElementById('root'));
serviceWorker.unregister();
