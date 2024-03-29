import React from 'react';
import ReactDOM from 'react-dom';
import './index.css';
import App from './App';

import './css/main.css';

import '../node_modules/bootstrap/dist/css/bootstrap.min.css';
// import '../node_modules/jquery/dist/jquery.min.js'
// import '../node_modules/jquery/dist/jquery';
import "../node_modules/video-react/dist/video-react.css"; // import css

import Amplify from 'aws-amplify'
import config from './aws-exports'
Amplify.configure(config)

ReactDOM.render(<App />, document.getElementById('root'));

// If you want your app to work offline and load faster, you can change
// unregister() to register() below. Note this comes with some pitfalls.
// Learn more about service workers: https://bit.ly/CRA-PWA

