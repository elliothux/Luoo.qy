import React from 'react';
import ReactDOM from 'react-dom';
import App from './components/App';
import { remote } from 'electron';


const main = remote.require('./main');


ReactDOM.render(
    <div>
        <App/>
    </div>,
    document.getElementById('root')
);
