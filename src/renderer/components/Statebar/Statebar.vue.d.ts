import { Vue } from 'vue-property-decorator';
export default class Statebar extends Vue {
    myVal: string;
    EncodeType: Array<string>;
    mounted(): void;
    row: number;
    col: number;
    changeOption(): void;
}
