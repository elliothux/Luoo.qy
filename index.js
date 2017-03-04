import React from 'react';
import ReactDOM from 'react-dom';
import App from './components/App';
import { remote } from 'electron';


const main = remote.require('./main');


// const isElementInViewport = function (el) {
//     const rect = el.getBoundingClientRect();
//     return (
//         el.getBoundingClientRect().bottom - window.innerHeight < -50
//     )
// };


ReactDOM.render(
    <div>
        <App getVolList={main.getVolList()}/>
    </div>,
    document.getElementById('root')
);
