'use strict'

import {
    app, BrowserWindow,Menu,
    Tray,
    ipcMain
} from 'electron'
declare namespace global {
    let __static: string
}
declare var __static: string;
const isMac = process.platform === 'darwin'
const execa = require('execa');
const iconv = require("iconv-lite");
/**
 * Set `__static` path to static files in production
 * https://simulatedgreg.gitbooks.io/electron-vue/content/en/using-static-assets.html
 */
if (process.env.NODE_ENV !== 'development') {
    global.__static = require('path').join(__dirname, '/static').replace(/\\/g, '\\\\')
}
let mainWindow: BrowserWindow | null
const winURL = process.env.NODE_ENV === 'development'
    ? `http://localhost:9080`
    : `file://${__dirname}/index.html`
const path = require('path');
let tray = null;
function createTray() {
    if (!isMac) {
        tray = new Tray(
            path.join(__static, './icon.ico')
        );
        const contextMenu = Menu.buildFromTemplate([
            { label: '退出', click: function () { app.quit() } }
        ])
        tray.setToolTip('BANANA')
        tray.setContextMenu(contextMenu)
    }
}
import * as Action from '../renderer/utils/definations/action'
import './events'
const dialog = require('electron').dialog
function ipcsendMsg(_msg: string, ..._args: any) {
    if (mainWindow)
        mainWindow.webContents.send(_msg, ..._args)
}
function createMenu() {
    const menuTemplate = [
        ...(isMac ? [{
            label: "BANANA",
            submenu: [{
                label: '关于',
                role: 'about'
            },
            {
                label: '用户手册',
                role: 'help'
            },
            {
                label: '网站'

            }
            ]
        }] : []),
        {
            label: '文件',
            submenu: [{
                label: '新建',
                click() { ipcsendMsg(Action.NEWFILE) },
                accelerator: 'CmdOrCtrl+N'
            },
            {
                label: '打开',
                click() { ipcsendMsg(Action.OPENFILE) },
                accelerator: 'CmdOrCtrl+O'
            },
            {
                label: '打开文件夹',
                click() {
                    let option: Electron.OpenDialogOptions = {
                        title: '打开文件',
                        defaultPath: '/',
                        // filters: [
                        //     {
                        //         name: 'Text',
                        //         extensions: ['png', 'jpg']
                        //     }
                        // ]
                        properties: ['openDirectory']
                    }
                    dialog.showOpenDialog(option, function (path: any) {
                        ipcsendMsg(Action.OPENDIR, path);
                    })
                    
                },
                accelerator: 'CmdOrCtrl+Shift+O'
            },
            {
                label: '保存',
                click() { ipcsendMsg(Action.SAVEFILE) },
                accelerator: 'CmdOrCtrl+S'
            },
            {
                label: '另存为...',
                click() { ipcsendMsg(Action.SAVEFILEAS) },
                accelerator: 'CmdOrCtrl+Shift+S'
            },
            {
                label: '退出',
                role: 'quit'
            }
            ]
        },
        {
            label: '编辑',
            submenu: [{
                label: '撤销',
                role: 'undo'
            },
            {
                label: '重做',
                role: 'redo'
            },
            {
                label: '剪切',
                role: 'cut'
            },
            {
                label: '复制',
                role: 'copy'
            },
            {
                label: '粘贴',
                role: 'paste'
            },
            {
                label: '全选',
                role: 'selectall'
            },
            {
                label: '删除',
                role: 'delete'
            },
            ]
        },
        {
            label: '视图',
            submenu: [
            {
                label: '重新载入页面',
                role: 'reload'
            },
            {
                label: '放大页面',
                role: 'zoomin'
            },
            {
                label: '缩小页面',
                role: 'zoomout'
            },
            {
                label: '缩小页面',
                role: 'zoomout'
            },
            {
                label: '还原初始页面',
                role: 'resetzoom'
            },
            {
                label: '全屏',
                role: 'togglefullscreen'
            },
            {
                label: '开发者模式',
                role: 'toggledevtools'
            }
            ]
        },
        {
            label: '编译',
            submenu: [{
                label: '控制台'
            },
            {
                label: '编译'
            },
            {
                label: '运行'
            },
            {
                label: '编译并运行'
            }
            ]
        },
        ...(!isMac ? [{
            label: "帮助",
            submenu: [{
                label: '关于',
                role: 'about'
            },
            {
                label: '用户手册',
                role: 'help'
            },
            {
                label: '网站'

            }
            ]
        }] : []),
    ];
    let menu = Menu.buildFromTemplate(menuTemplate)
    Menu.setApplicationMenu(menu)
}
function createWindow() {
    /**
     * Initial window options
     */
    mainWindow = new BrowserWindow({
        height: 563,
        useContentSize: true,
        width: 1000
    })

    mainWindow.loadURL(winURL)
    mainWindow.on('closed', () => {
        mainWindow = null
    })
    // createMenu();
    mainWindow.webContents.on('did-finish-load', () => {
        let command = "cmd";
        let args: never[] = [];
    
        // console.log("env:"+JSON.stringify(process.env));
        console.log("path:"+path.dirname(__dirname));
    
    
        process = execa(command, args, {
              cwd: path.dirname(__dirname),//__dirname,
              stdio: ['pipe', 'pipe', 'pipe'],
              //shell: true,
              env: process.env,
            })
    
        process.stdout.on('data', (buffer: { toString: () => any; }) => {
          if (process.platform === 'win32') {
              buffer = iconv.decode(buffer, "windows-31j");
          }
          console.log(buffer.toString());
          if(mainWindow!=null)
          mainWindow.webContents.send('terminal', buffer.toString());
        })
    
        process.stderr.on('data', (buffer: { toString: () => any; }) => {
          if (process.platform === 'win32') {
              buffer = iconv.decode(buffer, "windows-31j");
          }
          console.log(buffer.toString());
          if(mainWindow!=null)
          mainWindow.webContents.send('terminal', buffer.toString());
        })
    
        //win.webContents.send('terminal', "process.env:"+JSON.stringify(process.env));
        if(mainWindow!=null)
        mainWindow.webContents.send('terminal', "__dirname:"+__dirname);
    
      });
    
    
}

app.on('ready', createWindow)
app.on('ready', createTray)
app.on('ready', createMenu)

//



//
app.on('window-all-closed', () => {
    if (process.platform !== 'darwin') {
        app.quit()
    }
})

app.on('activate', () => {
    if (mainWindow === null) {
        createWindow()
    }
})

ipcMain.on('terminal', (event: any, arg: string) => {
    console.log(arg);
    let _ev = JSON.parse(arg);
    process.stdout.write(_ev.key);
    //event.reply('terminal', 'pong')
    process.stdin.write(_ev.key);
    if (_ev.key === "\r") {
      process.stdin.write("\n");
      console.log('pid:'+ process.pid)
      //child.stdin.end();
    }
  
  })
  
  
  ipcMain.on('asynchronous-message', (event: { reply: (arg0: string, arg1: string) => void; }, arg: any) => {
    console.log(arg) // prints "ping"
    event.reply('terminal', 'pong')
  })
  
  ipcMain.on('synchronous-message', (event: { returnValue: string; }, arg: any) => {
    console.log(arg) // prints "ping"
    event.returnValue = 'pong'
  })

/**
 * Auto Updater
 *
 * Uncomment the following code below and install `electron-updater` to
 * support auto updating. Code Signing with a valid certificate is required.
 * https://simulatedgreg.gitbooks.io/electron-vue/content/en/using-electron-builder.html#auto-updating
 */

/*
import { autoUpdater } from 'electron-updater'

autoUpdater.on('update-downloaded', () => {
  autoUpdater.quitAndInstall()
})

app.on('ready', () => {
  if (process.env.NODE_ENV === 'production') autoUpdater.checkForUpdates()
})
 */
