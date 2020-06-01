'use strict'

import {
    app, BrowserWindow,
    Menu,
    Tray
} from 'electron'
declare namespace global {
    let __static: string
}
declare var __static: string;
const isMac = process.platform === 'darwin'
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
function ipcsendMsg(_msg:string,..._args:any) {
    if (mainWindow)
        mainWindow.webContents.send(_msg,..._args)
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
                click() { ipcsendMsg(Action.NEWFILE) }
            },
            {
                label: '打开',
                click() { ipcsendMsg(Action.OPENFILE) }
            },
            {
                label: '保存',
                click() { ipcsendMsg(Action.SAVEFILE) }
            },
            {
                label: '另存为...',
                click() { ipcsendMsg(Action.SAVEFILEAS) }
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
            {
                label: '查找...'

            },
            {
                label: '替换...'
            }
            ]
        },
        {
            label: '视图',
            submenu: [{
                label: '显示/隐藏文件导航栏'
            },
            {
                label: '显示/隐藏状态栏'
            },
            {
                label: '显示/隐藏工具栏'
            },
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
function execution(languageType: string, runType: string, moduleName: string){
  //Language refers to what lanaguage it is using(Java, Python, C++ at temporary)
  //runType refers to complie/complie_and_run/run, initial when calling this function as static)
  //moduleName refers to the raw name expect for the extend words. e.g. for a file name.java, the raw name is 'name.java' while module name is 'name'
  var exec = require('child_process').exec;
  var cmdStr = ''
  if (languageType=='python'){
    if (process.platform == 'darwin'){
      cmdStr = 'python3 '+moduleName+'.py';
    }else if (process.platform == 'win32'){
      cmdStr = 'py -3 '+moduleName+'.py';
    }else{
      cmdStr = 'python '+moduleName+'.py';
    }
  }
  else if (languageType == 'java'){
    if (runType=='compile'){
      cmdStr = 'javac'+moduleName+'.java';
    }else if (runType =='compile_and_run'){
      cmdStr = 'javac'+moduleName+'.java;java'+moduleName;
    }else{
      cmdStr = 'java'+moduleName;
    }
    
  }else if (languageType == 'cpp'){
    if (process.platform == 'win32'){
      if (runType=='compile_and_run'){
        cmdStr = 'g++ '+moduleName+'.cpp;a.exe';
      }
      else if(runType='compile'){
        cmdStr = 'g++ '+moduleName+'.cpp';
      }else{
        cmdStr = 'a.exe';
      }
    }else{
      if (runType=='compile_and_run'){
        cmdStr = 'g++ '+moduleName+'.cpp;a.out';
      }
      else if(runType='compile'){
        cmdStr = 'g++ '+moduleName+'.cpp';
      }else{
        cmdStr = './a.out';
      }
    }
      
  }else{
    console.log("Not Supported Language yet.")
    return
  }

  exec(cmdStr, function(err: any,stdout: string,stderr: string){
      if(err) {
          console.log('Got ERROR:'+stderr);
      } else {
          var data = JSON.parse(stdout);
          console.log(data);
      }
  });
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
