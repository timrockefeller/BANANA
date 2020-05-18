/**
 * File Importer
 */
const fs = require("fs")

enum LanguageType {
    "c",
    "cpp",
    "python",
    "javascript"
}
class FileContent {
    constructor(filePath:string) {
        fs.readFile(filePath, (err : ExceptionInformation, _data:string) => {
            if(err)
                console.log(err);
            // TODO fix \n bug
            this.data = _data.toString().split("\n");
        })
    }
    public data: Array<string> = [];

    /**
     * getLanguageType
     */
    public getLanguageType(): LanguageType {
        return LanguageType.javascript
    }
}


export { FileContent }
