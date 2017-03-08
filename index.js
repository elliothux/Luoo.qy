import React from 'react';
import ReactDOM from 'react-dom';
import App from './components/App';
import { remote } from 'electron';
import electron from 'electron';


const main = remote.require('./main');
electron.webFrame.setVisualZoomLevelLimits(1, 1);
// const isElementInViewport = function (el) {
//     const rect = el.getBoundingClientRect();
//     return (
//         el.getBoundingClientRect().bottom - window.innerHeight < -50
//     )
// };


ReactDOM.render(
    <div>
        <App getVolList={main.getVolList()} getSingleList={main.getSingleList()}/>
    </div>,
    document.getElementById('root')
);
