import { Vue } from 'vue-property-decorator';
import { FileContent } from '../../utils/file';
export default class Editor extends Vue {
    name: String;
    file: FileContent;
    inserterPosX: Number;
    inserterPosY: Number;
    onfocus: Boolean;
    get keyput(): String;
    set keyput(value: String);
    get inserterStyle(): string;
    mouseEvent(e: MouseEvent): void;
    tabEvent(_e: KeyboardEvent): void;
    parsetext(ori: string): string;
}
