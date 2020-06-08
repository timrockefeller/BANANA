/**
 * File Importer
 */
const fs = require("fs")
const pt = require("path")
const iconv = require('iconv-lite');
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
        new SuffixPare('python', 'py', 'pyc'),
        new SuffixPare('javascript', 'js', 'json'),
        new SuffixPare('text/x-c++src', 'cpp', 'hpp', 'c', 'h'),
        new SuffixPare('text/x-java', 'java'),
        new SuffixPare('html/text', 'html', 'htm'),
        new SuffixPare('markdown', 'md', 'txt'),
        new SuffixPare('x-shader/x-vertex', 'vs', 'fs', 'vet', 'frg'),
        new SuffixPare('htmlmixed', 'vue'),
        new SuffixPare('text/css', 'css', 'scss'),
        new SuffixPare('text/typescript','ts')
    ]
}
const EncodeType: Array<string> = [
    'utf-8', 'gbk', 'gb2312', 'gb18030', 'Big5', 'Big5-HKSCS', 'Shift JIS'
]
class FileContent {
    constructor(filePath: string, encoding_u: string = 'utf-8') {
        if (filePath) {
            this.onCreate(filePath);
            this.changeEncoding(encoding_u)
            this.loadData()
        }
    }
    onCreate(filePath: string) {
        this.language = LanguageType.getLang(filePath.substr(filePath.lastIndexOf('.') + 1))
        this.path = pt.resolve(filePath);
    }

    loadData() {
        if (this.path) {
            this.data = fs.readFileSync(this.path);
            this.data = iconv.decode(this.data, this.encoding).toString(); // 不乱码
        }
        this.modified = false
    }

    changeEncoding(encoding_u: string) {
        this.encoding = encoding_u;
    }

    public path: string = '';
    public encoding = EncodeType[0]
    public data: string = '';
    public language: string = LanguageType.getLang('')
    public modified: boolean = false

    setPath(filePath: string) {
        this.language = LanguageType.getLang(filePath.substr(filePath.lastIndexOf('.') + 1))
        this.path = pt.resolve(filePath);
    }

    onSave() {
        if (this.modified && this.path != null)
            fs.writeFileSync(this.path, iconv.encode(this.data, this.encoding));
        this.modified = false
    }
}


export {FileContent,EncodeType}
