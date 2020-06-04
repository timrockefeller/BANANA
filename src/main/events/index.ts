const ipc = require('electron').ipcMain
const ipcPromise = require('ipc-promise')
const dialog = require('electron').dialog
import * as Action from '../../renderer/utils/definations/action'
import { IpcMessageEvent, MessageBoxOptions } from 'electron'

ipc.on(Action.IPC_SAVE_FILE_DIAL, function (event: IpcMessageEvent) {
    let option: Electron.SaveDialogOptions = {
        title: '另存为',
        defaultPath: '/'
        // filters: [
        //     {
        //         name: 'Text',
        //         extensions: ['png', 'jpg']
        //     }
        // ]
    }
    dialog.showSaveDialog(option, function (filename: string) {
        event.sender.send(Action.IPC_SAVE_FILE_CALLBACK, filename);
    })
})

ipc.on(Action.IPC_OPEN_FILE_DIAL, function (event: IpcMessageEvent) {
    let option: Electron.OpenDialogOptions = {
        title: '打开文件',
        defaultPath: '/'
        // filters: [
        //     {
        //         name: 'Text',
        //         extensions: ['png', 'jpg']
        //     }
        // ]
    }
    dialog.showOpenDialog(option, function (filename) {
        event.sender.send(Action.IPC_OPEN_FILE_CALLBACK, filename);
    })
})

// 新建文件时的修改保存确认
ipc.on(Action.NEWFILE, function (event: IpcMessageEvent) {
    const options: Electron.MessageBoxOptions = {
        type: 'info',
        title: '注意',
        message: "文件未保存，是否放弃修改？",
        buttons: ['取消', '放弃']
    }
    dialog.showMessageBox(options, function (index) {
        event.sender.send(Action.IPC_CONFIRM_NEWFILE, index == 1)
    })
})

// 打开文件时的修改保存确认
ipc.on(Action.OPENFILE, function (event: IpcMessageEvent) {
    const options: Electron.MessageBoxOptions = {
        type: 'info',
        title: '注意',
        message: "文件未保存，是否放弃修改？",
        buttons: ['取消', '放弃']
    }
    dialog.showMessageBox(options, function (index) {
        event.sender.send(Action.IPC_CONFIRM_OPENFILE, index == 1)
    })
})
