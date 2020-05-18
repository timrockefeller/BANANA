/**
 * File Importer
 */

enum LanguageType { 
    "c",
    "cpp",
    "python",
    "javascript"
}
class FileContent extends File {
    /**
     * getLanguageType
     */
    public getLanguageType(): LanguageType {
        return LanguageType.javascript
    }
}
