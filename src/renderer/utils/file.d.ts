declare const EncodeType: Array<string>;
declare class FileContent {
    constructor(filePath: string, encoding_u?: string);
    onCreate(filePath: string): void;
    loadData(): void;
    changeEncoding(encoding_u: string): void;
    path: string;
    encoding: string;
    data: string;
    language: string;
    modified: boolean;
    setPath(filePath: string): void;
    onSave(): void;
}
export { FileContent, EncodeType };
