declare enum LanguageType {
    "c" = 0,
    "cpp" = 1,
    "python" = 2,
    "javascript" = 3
}
declare class FileContent {
    constructor(filePath: string);
    data: Array<string>;
    /**
     * getLanguageType
     */
    getLanguageType(): LanguageType;
}
export { FileContent };
