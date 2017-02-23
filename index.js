import React from 'react';
import ReactDOM from 'react-dom';
import App from './components/App';
import { remote } from 'electron';


const main = remote.require('./main');
const getVolList = main.getVolList;
const getTrackList = main.getTrackList;

const isElementInViewport = function (el) {
    const rect = el.getBoundingClientRect();
    return (
        el.getBoundingClientRect().bottom - window.innerHeight < -50
    )
};


ReactDOM.render(
    <div>
        <App getVolList={getVolList} getTrackList={getTrackList} isElementInViewport={isElementInViewport}/>
    </div>,
    document.getElementById('root')
);
