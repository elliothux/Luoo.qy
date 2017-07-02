const BrowserWindow = require('electron').BrowserWindow;
const platform = require('os').platform();



module.exports = (app, window, ipcMain) => [
    {
        label: "Luoo.qy",
        submenu: [
            {
                label: "关闭",
                accelerator: "CmdOrCtrl+W",
                click: () => {
                    BrowserWindow.getFocusedWindow() === window ?
                        (platform === 'win32' ?  window.minimize() : window.hide()) :
                        BrowserWindow.getFocusedWindow().close()
                }
            },
            {
                label: "退出",
                accelerator: "CmdOrCtrl+Q",
                click: app.quit
            },
            {
                label: "重新载入",
                accelerator: "CmdOrCtrl+R",
                click: () => { BrowserWindow.getFocusedWindow().webContents.reload() }
            },
        ]
    },
    // {
    //     label: "控制",
    //     submenu: [
    //         {label: "暂停 / 播放", accelerator: "CmdOrCtrl+Z", selector: "undo:"},
    //         {label: "下一曲", accelerator: "Shift+CmdOrCtrl+Z", selector: "redo:"},
    //         {label: "上一曲", accelerator: "Shift+CmdOrCtrl+Z", selector: "redo:"},
    //     ]
    // },
    {
        label: "编辑",
        submenu: [
            {label: "剪切", accelerator: "CmdOrCtrl+X", selector: "cut:"},
            {label: "复制", accelerator: "CmdOrCtrl+C", selector: "copy:"},
            {label: "粘贴", accelerator: "CmdOrCtrl+V", selector: "paste:"},
            {label: "全选", accelerator: "CmdOrCtrl+A", selector: "selectAll:"}
        ]
    },
    {
        label: "开发者选项",
        submenu: [
            {
                label: '打开DevTools',
                accelerator: "CmdOrCtrl+Alt+i",
                click: () => { BrowserWindow.getFocusedWindow().webContents.openDevTools() }
            }
        ]
    },
];