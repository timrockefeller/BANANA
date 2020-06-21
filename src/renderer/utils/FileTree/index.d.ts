declare class FileTree {
    rmEmpty: Boolean;
    fileCount: number;
    folderCount: number;
    filesCount: number;
    foldersCount: number;
    allCount: number;
    files: never[];
    folders: never[];
    /**
     * 初始化文件结构
     * @param {object} options 配置参数 ()
     */
    constructor(path?: string);
    Traverse(folder1: any, dir?: string): void;
    /**
     * 更新统计数据
     */
    updateCount(): void;
    /**
     * 按标准格式化路径
     * @param {string} path 路径
     */
    formatPath(path?: string): string;
    /**
     * 增加文件夹
     * @param {string} path 路径
     * @param {object} data 数据
     * @return {object} 成功返回创建的文件夹/失败返回null
     */
    addFolder(path?: string, data?: {}): null | undefined;
    /**
     * 删除文件夹
     * @param {string} path 路径
     * @return {boolean} 成功或失败
     */
    rmFolder(path?: string): boolean;
    /**
     * 获取文件夹
     * @param {string} path 路径
     * @return {object} 文件夹或者null
     */
    getFolder(path?: string): any;
    /**
     * 增加文件[增加路径中不存在的所有文件夹]
     * @param {string} path 路径
     * @param {object} data 添加的参数
     * @return {object} 成功返回创建的文件/失败返回null
     */
    addFile(path?: string, data?: {}): {
        name: string | undefined;
    } | null;
    /**
     * 删除文件
     * @param {string} path 路径
     * @return {boolean} 成功/失败
     */
    rmFile(path?: string): boolean | null;
    /**
     * 获取文件
     * @param {string} 文件路径
     * @return {object} 文件或者null
     */
    getFile(path?: string): any;
    /**
     * 删除空目录
     * @return {number} 删除掉的目录个数
     */
    formatFolder(): number;
    /**
     * 获取树形结构
     * @params {boolean} toLog 打印到log输出
     * @return {string} 树形结构
     */
    getTree(toLog?: boolean): string;
}
export default FileTree;
