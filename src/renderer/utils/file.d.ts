declare class FileContent {
    constructor(filePath: string, encoding_r: string, encoding_w: string);
    onCreate(filePath: string): void;
    loadData(): void;
    changerEncoding(encoding_r: string): void;
    changewEncoding(encoding_w: string): void;
    path: string;
    w_encoding: string;
    r_encoding: string;
    data: string;
    language: string;
    onSave(): void;
}
export { FileContent };
