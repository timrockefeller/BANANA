declare class FileContent {
    constructor(filePath: string, encoding_s: string);
    onCreate(filePath: string): void;
    loadData(): void;
    changeEncoding(encoding_s: string): void;
    path: string;
    encoding: string;
    data: string;
    language: string;
    onSave(): void;
}
export { FileContent };
