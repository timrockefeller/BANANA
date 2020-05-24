declare class FileContent {
    constructor(filePath: string);
    onCreate(filePath: string): void;
    path: string;
    encoding: string;
    data: string;
    language: string;
}
export { FileContent };
