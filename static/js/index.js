import React from 'react';
import ReactDOM from 'react-dom';
import App from '../../components/App';
import electron, { remote } from 'electron';


const openExternal = electron.shell.openExternal;
const main = remote.require('./main');
electron.webFrame.setVisualZoomLevelLimits(1, 1);


ReactDOM.render(
    <div>
        <App
            getVolList={main.getVolList()}
            getSingleList={main.getSingleList()}
            openExternal={openExternal}
            platform={main.platform}
        />
    </div>,
    document.getElementById('root')
);
