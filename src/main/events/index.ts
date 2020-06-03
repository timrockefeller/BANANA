const ipc = require('electron').ipcMain
const dialog = require('electron').dialog
import * as Action from '../../renderer/utils/definations/action'
ipc.on(Action.IPC_SAVE_FILE_DIAL, function(event:any) {
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
    dialog.showSaveDialog(option, function (filename) {
      event.sender.send(Action.IPC_SAVE_FILE_CALLBACK, filename);
    })
})

ipc.on(Action.IPC_OPEN_FILE_DIAL, function(event:any) {
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
