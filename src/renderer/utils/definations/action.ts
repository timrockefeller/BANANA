// 新建空白文件
export const NEWFILE = "editor.newfile"
// 打开单个文件
export const OPENFILE = "editor.open"
export const OPENFILE_TREE = 'editor.openfromtree'
// 打开文件夹
export const OPENDIR = "editor.opendir"
// 保存文件
export const SAVEFILE = "editor.save"
export const SAVEFILEAS = "editor.saveas"

// 设置文件打开编码
export const R_ENCODE = "encode.read"
// 设置文件保存编码
export const W_ENCODE = "encode.write"

// 设置文件高亮模式
export const SETLANG = "editor.setlang"
// 刷新行列
export const CURSOR_ACTIVITY = "editor.cursorActivity"
//改变编码
export const CHANGE_ENCODING = "change_encoding"

// electron ipc trackers
export const IPC_SAVE_FILE_DIAL = "ipc.open-save-dialog"
export const IPC_SAVE_FILE_CALLBACK = "ipc.call-save-dialog"
export const IPC_OPEN_FILE_DIAL = "ipc.open-open-dialog"
export const IPC_CONFIRM_OPENFILE = "ipc.confirm-openfile"
export const IPC_OPEN_FILE_CALLBACK = "ipc.call-open-dialog"
export const IPC_CONFIRM_NEWFILE = "ipc.confirm-newfile"
export const IPC_CHANGE_ENCODING_METHOD = "ipc.changeencoding-method"
export const IPC_CONFIRM_OPENFILE_TREE = "ipc.confirm-openfromtree"
