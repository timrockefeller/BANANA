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
        new SuffixPare('python', 'py'),
        new SuffixPare('javascript', 'js', 'json'),
        new SuffixPare('cpp', 'cpp', 'hpp', 'c', 'h')
    ]
}
const EncodeType: Array<string> = [
    'utf-8','gbk','gb2312','gb18030','Big5','Big5-HKSCS','Shift JIS'
]
class FileContent {
    constructor(filePath: string,encoding_r: string,encoding_w: string) {
        this.onCreate(filePath);
        this.loadData()
        this.changerEncoding(encoding_r)
        this.changewEncoding(encoding_w)
        this.w_encoding = 'utf-8'
        this.r_encoding = 'utf-8'
    }
    onCreate(filePath: string) {
        this.language = LanguageType.getLang(filePath.substr(filePath.lastIndexOf('.') + 1))
        this.path = pt.resolve(filePath);
        // FIXME 猜测编码？
    }

    loadData() {
       this.data = fs.readFileSync(this.path);
       this.data = iconv.decode(this.data,this.w_encoding).toString(); // 不乱码
    }

    changerEncoding(encoding_r: string){
        for (let Encodetype of EncodeType) {
            if (Encodetype.localeCompare(encoding_r) === 0) {
                this.r_encoding = encoding_r;
            }
        }
    }
    changewEncoding(encoding_w: string)
    {    for (let Encodetype of EncodeType) {
            if (Encodetype.localeCompare(encoding_w) === 0) {
                this.w_encoding = encoding_w;
            }
        }

    }

    public path: string = '';
    public w_encoding = EncodeType[0]
    public r_encoding = EncodeType[0]
    public data: string = '';
    public language: string = LanguageType.getLang('')

    onSave() {
        if (this.path != null)
            fs.writeFileSync(this.path, this.data, this.w_encoding);
    }
}


export { FileContent }
