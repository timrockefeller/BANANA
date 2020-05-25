'use strict'

import { app, BrowserWindow, 
  Menu, 
  //Tray, 
} from 'electron'
declare namespace global {
    let __static: string
}
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

function createMenu() {
  if (process.platform === 'win32') {
    const menuTemplate = [{
      label: '文件',
      submenu: [{
        label: '新建文件'
      },
      {
        label: '打开文件'
      },
      {
        label: '保存文件'
      },
      {
        label: '退出'
      }
      ]
    },
    {
      label: '编辑',
      submenu: [{
        label: '撤销'
      },
      {
        label: '重做'
      },
      {
        label: '剪切'
      },
      {
        label: '复制'
      },
      {
        label: '粘贴'
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
    {
      label: '帮助',
      submenu: [{
        label: '关于'
      },
      {
        label: '用户手册'
      },
      {
        label: '网站'
      }
      ]
    }
    ];
    let menu = Menu.buildFromTemplate(menuTemplate)
    Menu.setApplicationMenu(menu)
  } else {
    Menu.setApplicationMenu(null)
  }
}

function createWindow () {
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
  //createMenu();
}

app.on('ready', createWindow)
app.on('ready',createMenu)

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
