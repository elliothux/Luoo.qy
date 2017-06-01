const BrowserWindow = require('electron').BrowserWindow;
const platform = require('os').platform();



module.exports = (app, window, ipcMain) => [
    {
        label: "Luoo.qy",
        submenu: [
            {
                label: '关于Page.qy',
                selector: "orderFrontStandardAboutPanel:"
            },
            {type: "separator"},
            {
                label: "退出",
                accelerator: "CmdOrCtrl+Q",
                click: app.quit
            },
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
                label:"刷新",
                accelerator: "CmdOrCtrl+R",
                click: () => { BrowserWindow.getFocusedWindow().webContents.reload() }
            },
        ]
    },
    {
        label: "播放",
        submenu: [
            {
                label:"播放",
            },
            {
                label:"暂停",
            },
            {
                label:"上一曲",
            },
            {
                label:"下一曲",
            },
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
    }
];