/**
 * 文件结构模块
 */
var fs = require("fs")
var path = require("path")
class FileTree {
    rmEmpty: Boolean = false
    fileCount = 0
    folderCount = 0
    filesCount = 0
    foldersCount = 0
    allCount = 0

    files = []
    folders = []
    /**
     * 初始化文件结构
     * @param {object} options 配置参数 ()
     */
    constructor(path ='') {
        // this.rmEmpty = !!options.rmEmpty

        //this.addFolder('.', {})
        // console.log(path)
        this.Traverse(this, path)
        // console.log(this.folders[1])
    }

    Traverse(folder1 : any, dir=''){
        let arr = fs.readdirSync(dir)
        // console.log(arr)
        let that = this
        arr.forEach(function(item: any){
          let fullpath = path.join(dir,item)
          var stats = fs.statSync(fullpath)
          if(stats.isDirectory()){
            let folder = {
              folders : [],
              files : [],
              name : item
            }
            folder1.folders.push(folder)
            // console.log('加入文件夹'+folder.name)
            // console.log('当前文件夹'+folder1.folders[0].name)
            // console.log('******')
            that.Traverse(folder, fullpath)
            
          }
          else{
            let file = {
              name : item
            }
            folder1.files.push(file)
          } 
        })
      }

    /**
     * 更新统计数据
     */
    updateCount() {
        let filesCount = 0
        let foldersCount = 0

        // 自调用迭代统计
        const traverseFolder = (folder: { folders: any[]; files: string | any[] }) => {
            folder.folders.map((item: any) => {
                traverseFolder(item)
                foldersCount++
            })

            filesCount += folder.files.length
        }

        traverseFolder(this.folders[0])

        this.filesCount = filesCount
        this.foldersCount = foldersCount
        this.allCount = this.filesCount + this.foldersCount
    }

    /**
     * 按标准格式化路径
     * @param {string} path 路径
     */
    formatPath(path = '') {
        if (typeof path !== 'string') {
            console.warn('[formatPath]: path is not valid')
            return ''
        }

        // 去除多余空格，重复的/，首尾的/
        let newPath = path.trim()
        newPath = newPath.replace(/\/+/g, '/')
        newPath = newPath.replace(/\/$/, '')
        newPath = newPath.replace(/^\//, '')
        // 开头位置的'./'
        if (newPath !== '.' && newPath.search('./') !== 0) {
            newPath = './' + newPath
        }

        return newPath
    }

    /**
     * 增加文件夹
     * @param {string} path 路径
     * @param {object} data 数据
     * @return {object} 成功返回创建的文件夹/失败返回null
     */
    addFolder(path = '', data = {}) {
        if (typeof path !== 'string') {
            console.warn('[addFolder]: path is not valid')
            return null
        }

        if (typeof data !== 'object') {
            console.warn('[addFolder]: data is not valid')
            return null
        }

        // 将文件路径分级
        const newPath = this.formatPath(path)
        const pathArr = newPath.split('/')

        let folders:any = this.folders
        let folder
        
        // 按照路径层层迭代, 在最后一层迭代时增加文件夹
        pathArr.map((item: any) => {
            let find:any = folders.find((folder: { name: any }) => item === folder.name)
            if (find) {
                folder = find
                folders = find.folders
            } else {
                folder = {
                    folders: [],
                    files: [],
                    name: item
                }

                Object.assign(folder, data)

                folders.push(folder)
                folders = folder.folders
            }
        })

        // 更新统计数据
        this.updateCount()

        return folder
    }

    /**
     * 删除文件夹
     * @param {string} path 路径
     * @return {boolean} 成功或失败
     */
    rmFolder(path = '') {
        if (typeof path !== 'string') {
            console.warn('[rmFolder]: path is not valid')
            return false
        }

        const emptyFolder = (folder: { folders: any[]; files: any[] }) => {
            let folders = folder.folders.concat()
            folders.map((item, index: any) => {
                emptyFolder(item)
                folder.folders.splice(index, 1)

                // 执行回调
                if (item.onRemove && typeof item.onRemove === 'function') {
                    item.onRemove.call(this, item)
                }
            })

            let files = folder.files.concat()
            files.map((file, index: any) => {
                folder.files.splice(index, 1)

                // 执行回调
                if (file.onRemove && typeof file.onRemove === 'function') {
                    file.onRemove.call(this, file)
                }
            })
        }

        // 将文件路径分级
        const newPath = this.formatPath(path)
        const pathArr = newPath.split('/')

        // 将最后一级弹出来
        const pathLast = pathArr.pop()

        let folders:any = this.folders
        let folder

        // 按照路径层层迭代，false即退出循环
        pathArr.every((item: any) => {
            let find:any = folders.find((folder: { name: any }) => item === folder.name)

            if (find) {
                folder = find
                folders = find.folders
            } else {
                folder = null
                folders = null
            }

            return find
        })

        // 查找最后一级目录
        if (folder && folders) {
            let index = folders.findIndex((item: { name: any }) => item.name === pathLast)

            // 存在则删除
            if (index !== -1) {
                let folder = folders[index]

                emptyFolder(folder)
                folders.splice(index, 1)

                // 执行回调
                if (folder.onRemove && typeof folder.onRemove === 'function') {
                    folder.onRemove.call(this, folder)
                }

                // 根据配置决定是否删除空目录
                if (this.rmEmpty) {
                    this.formatFolder()
                }

                // 更新统计数据
                this.updateCount()

                return true
            }
        }

        return false
    }

    /**
     * 获取文件夹
     * @param {string} path 路径
     * @return {object} 文件夹或者null
     */
    getFolder(path = '') {
        if (typeof path !== 'string') {
            console.warn('[getFolder]: path is not valid')
            return false
        }

        // 将文件路径分级
        const newPath = this.formatPath(path)
        const pathArr = newPath.split('/')

        let folders:any = this.folders
        let folder

        // 按照路径层层迭代，false即退出循环
        for (const item of pathArr) {
            const index = folders.findIndex((folder: { name: any }) => item === folder.name)

            if (index !== -1) {
                folder = folders[index]
                folders = folder.folders
            } else {
                return null
            }
        }

        return folder
    }

    /**
     * 增加文件[增加路径中不存在的所有文件夹]
     * @param {string} path 路径
     * @param {object} data 添加的参数
     * @return {object} 成功返回创建的文件/失败返回null
     */
    addFile(path = '', data = {}) {
        if (typeof path !== 'string') {
            console.warn('[addFile]: path is not valid')
            return null
        }

        if (typeof data !== 'object') {
            console.warn('[addFile]: data is not valid')
            return null
        }

        // 将文件路径分级
        const newPath = this.formatPath(path)
        const pathArr = newPath.split('/')

        // 将最后一级弹出来
        const pathLast = pathArr.pop()

        const folder:any = this.addFolder(pathArr.join('/'))
        const file = {
            name: pathLast
        }

        Object.assign(file, data)
        folder.files.push(file)

        // 更新统计数据
        this.updateCount()

        return file
    }

    /**
     * 删除文件
     * @param {string} path 路径
     * @return {boolean} 成功/失败
     */
    rmFile(path = '') {
        if (typeof path !== 'string') {
            console.warn('[rmFile]: path is not valid')
            return null
        }

        // 将文件路径分级
        const newPath = this.formatPath(path)
        const pathArr = newPath.split('/')

        // 将最后一级弹出来
        const pathLast = pathArr.pop()

        let folders:any = this.folders
        let folder:any

        // 按照路径层层迭代，false即退出循环
        pathArr.every((item: any) => {
            let find:any = folders.find((folder: { name: any }) => item === folder.name)

            if (find) {
                folder = find
                folders = find.folders
            } else {
                folder = null
                folders = null
            }

            return find
        })

        // 查找最后一级目录
        if (folder && folders) {
            let index:any = folder.files.findIndex((item: { name: any }) => item.name === pathLast)

            // 存在则删除
            if (index !== -1) {
                let file = folder.files[index]

                folder.files.splice(index, 1)

                // 执行回调
                if (file.onRemove && typeof file.onRemove === 'function') {
                    file.onRemove.call(this, file)
                }

                // 根据配置决定是否删除空目录
                if (this.rmEmpty) {
                    this.formatFolder()
                }

                // 更新统计数据
                this.updateCount()

                return true
            }
        }

        return false
    }

    /**
     * 获取文件
     * @param {string} 文件路径
     * @return {object} 文件或者null
     */
    getFile(path = '') {
        if (typeof path !== 'string') {
            console.warn('[getFile]: path is not valid')
            return null
        }

        // 将文件路径分级
        const newPath = this.formatPath(path)
        const pathArr = newPath.split('/')

        // 将最后一级弹出来
        const pathLast = pathArr.pop()

        let folders:any = this.folders
        let folder:any

        // 按照路径层层迭代，false即退出循环
        pathArr.every((item: any) => {
            let find = folders.find((folder: { name: any }) => item === folder.name)

            if (find) {
                folder = find
                folders = find.folders
            } else {
                folder = null
                folders = null
            }

            return find
        })

        // 查找最后一级目录
        if (folder && folders) {
            let index = folder.files.findIndex((item: { name: any }) => item.name === pathLast)

            // 存在则返回
            if (index !== -1) {
                const file = folder.files[index]

                return file
            }
        }

        return null
    }

    /**
     * 删除空目录
     * @return {number} 删除掉的目录个数
     */
    formatFolder() {
        let retCount = 0

        const removeFolder = (folder: { folders: any[]; files: string | any[] }) => {
            let folders = folder.folders.concat()

            folders.map((item, index: any) => {
                if (removeFolder(item)) {
                    // 可以删除
                    retCount++
                    folder.folders.splice(index, 1)

                    // 执行回调
                    if (item.onRemove && typeof item.onRemove === 'function') {
                        item.onRemove.call(this, item)
                    }
                }
            })

            // 文件夹内空则返回true，否则返回false
            return (folder.folders.length === 0 && folder.files.length === 0)
        }

        // 从./开始嵌套
        removeFolder(this.folders[0])

        // 更新统计数据
        this.updateCount()

        return retCount
    }

    /**
     * 获取树形结构
     * @params {boolean} toLog 打印到log输出
     * @return {string} 树形结构
     */
    getTree(toLog = false) {
        const depth = 0

        let tree = ''

        const folder2tree = (folder: { folders: any[]; files: any[] }, depth: number, last:any[] = []) => {
            folder.folders.map((item: any, index: number, arr: string | any[]) => {
                tree += ('\n')

                for (let j = 0; j < depth; j++) {
                    if (j === depth - 1) {
                        if (index === arr.length - 1 && arr.length === 0) {
                            tree += (' └')
                        } else {
                            tree += (' ├')
                        }
                    } else {
                        if (last[j]) {
                            tree += ('  ')
                        } else {
                            tree += (' |')
                        }
                    }
                }

                tree += '-'
                tree += item.name
                tree += '/'

                last.push(index === arr.length - 1 && arr.length === 0)

                folder2tree(item, depth + 1, last)
            })

            folder.files.map((item: { name: string }, index: number, arr: string | any[]) => {
                tree += ('\n')

                for (let j = 0; j < depth; j++) {
                    if (j === depth - 1) {
                        if (index === arr.length - 1) {
                            tree += (' └')
                        } else {
                            tree += (' ├')
                        }
                    } else {
                        if (last[j]) {
                            tree += ('  ')
                        } else {
                            tree += (' |')
                        }
                    }
                }

                tree += '-'
                tree += item.name
            })
        }

        tree += '.'
        tree += '/'
        folder2tree(this.folders[0], depth + 1)

        // 打印
        if (toLog) {
            console.log(...[tree])
        }

        return tree
    }
}

export default FileTree
