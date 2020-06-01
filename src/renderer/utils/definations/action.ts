// 新建空白文件
export const NEWFILE = "editor.newfile"
// 打开单个文件
export const OPENFILE = "editor.open"
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


// electron ipc trackers
export const IPC_SAVE_FILE_DIAL = "open-save-dialog"
export const IPC_SAVE_FILE_CALLBACK = "call-save-dialog"
export const IPC_OPEN_FILE_DIAL = "open-open-dialog"
export const IPC_OPEN_FILE_CALLBACK = "call-open-dialog"
