const BrowserWindow = require('electron').BrowserWindow;
const platform = require('os').platform();
const config = () => ({
    language: 'zh'
});



module.exports = (app, window, ipcMain) => [
    {
        label: "Page.qy",
        submenu: [
            {
                label: config().language === 'zh' ? '关于Page.qy' : "About Application",
                selector: "orderFrontStandardAboutPanel:"
            },
            {type: "separator"},
            {
                label: config().language === 'zh' ? "退出" : "Quit",
                accelerator: "CmdOrCtrl+Q",
                click: app.quit
            },
            {
                label: config().language === 'zh' ? "关闭" : "Close",
                accelerator: "CmdOrCtrl+W",
                click: () => {
                    BrowserWindow.getFocusedWindow() === window ?
                        (platform === 'win32' ?  window.minimize() : window.hide()) :
                        BrowserWindow.getFocusedWindow().close()
                }
            },
            {
                label: config().language === 'zh' ? "刷新" : "Reload",
                accelerator: "CmdOrCtrl+R",
                click: () => { BrowserWindow.getFocusedWindow().webContents.reload() }
            },
        ]
    },
    {
        label: config.language === 'zh' ? "编辑" : "Edit",
        submenu: [
            {label: config().language === 'zh' ? "撤销" : "Undo", accelerator: "CmdOrCtrl+Z", selector: "undo:"},
            {label: config().language === 'zh' ? "重做" : "Redo", accelerator: "Shift+CmdOrCtrl+Z", selector: "redo:"},
            {type: "separator"},
            {label: config().language === 'zh' ? "剪切" : "Cut", accelerator: "CmdOrCtrl+X", selector: "cut:"},
            {label: config().language === 'zh' ? "复制" : "Copy", accelerator: "CmdOrCtrl+C", selector: "copy:"},
            {label: config().language === 'zh' ? "粘贴" : "Paste", accelerator: "CmdOrCtrl+V", selector: "paste:"},
            {
                label: config().language === 'zh' ? "全选" : "Select All",
                accelerator: "CmdOrCtrl+A",
                selector: "selectAll:"
            }
        ]
    },
    {
        label: config.language === 'zh' ? "开发者选项" : "Development",
        submenu: [
            {
                label: config().language === 'zh' ? '打开DevTools' : "Open DevTools",
                accelerator: "CmdOrCtrl+Alt+i",
                click: () => { BrowserWindow.getFocusedWindow().webContents.openDevTools() }
            }
        ]
    }
];