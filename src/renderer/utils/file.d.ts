/**
 * File Importer
 */
declare enum LanguageType {
    "c" = 0,
    "cpp" = 1,
    "python" = 2,
    "javascript" = 3
}
declare class FileContent extends File {
    /**
     * getLanguageType
     */
    getLanguageType(): LanguageType;
}
