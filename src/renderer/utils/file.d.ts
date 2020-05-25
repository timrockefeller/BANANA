declare class FileContent {
    constructor(filePath: string);
    onCreate(filePath: string): void;
    loadData(): void;
    path: string;
    encoding: string;
    data: string;
    language: string;
    onSave(): void;
}
export { FileContent };
