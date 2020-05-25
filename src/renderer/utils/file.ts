/**
 * File Importer
 */
const fs = require("fs")
const pt = require("path")
/**
 * Suffix Defines
 */
class SuffixPare {
    constructor(_language: string, ..._suffixes: Array<string>) {
        this.language = _language
        this.suffixes = _suffixes
    }
    language: string = ""
    suffixes: string[] = []
}
const LanguageType: any = {
    getLang(_suffix: string): string {
        for (let sufp of this.langPare) {
            for (let suf of sufp.suffixes) {
                if (_suffix.localeCompare(suf) === 0) {
                    return sufp.language;
                }
            }
        }
        return ''
    },
    langPare: [
        new SuffixPare('python', 'py'),
        new SuffixPare('javascript', 'js', 'json'),
        new SuffixPare('cpp', 'cpp', 'hpp', 'c', 'h')
    ]
}
const EncodeType: Array<string> = [
    "utf-8"
]
class FileContent {
    constructor(filePath: string) {
        this.onCreate(filePath);
        this.loadData()
    }
    onCreate(filePath: string) {
        this.language = LanguageType.getLang(filePath.substr(filePath.lastIndexOf('.') + 1))
        this.path = pt.resolve(filePath);
        // FIXME 猜测编码？
        this.encoding = EncodeType[0]
    }

    loadData() {
        this.data = fs.readFileSync(this.path, { encoding: this.encoding }).toString();
    }

    public path: string = '';
    public encoding = EncodeType[0]
    public data: string = '';
    public language: string = LanguageType.getLang('')

    onSave() {
        if (this.path != null)
            fs.writeFileSync(this.path, this.data, { encoding: this.encoding });
    }
}


export { FileContent }
