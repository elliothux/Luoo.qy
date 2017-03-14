import React from 'react';
import ReactDOM from 'react-dom';
import App from '../../components/App';
import electron, { remote } from 'electron';


// 使用外部浏览器打开链接
const openExternal = electron.shell.openExternal;
// 调用主进程方法的接口
const main = remote.require('./main');
// 禁止缩放
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
