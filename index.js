import React from 'react';
import ReactDOM from 'react-dom';
import App from './components/App';
import { remote } from 'electron';


const main = remote.require('./main');
const getVolList = main.getVolList;
const getTrackList = main.getTrackList;


ReactDOM.render(
    <div>
        <App getVolList={getVolList} getTrackList={getTrackList}/>
    </div>,
    document.getElementById('root')
);
