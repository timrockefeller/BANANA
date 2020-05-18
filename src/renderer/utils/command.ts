// import Vue from 'vue'
// import { INSERT }from './definatrions/action'
interface Command {
    action: string
    execute(): void
}

class EventBus {
    constructor() {

    }
    cmds: Command[] = []
    public bind(cmd: Command): void {
        this.cmds.push(cmd);
    }
    public trigger(action: string): void {
        for (let cmd of this.cmds) {
            if (cmd.action == action) {
                cmd.execute()
            }
        }
    }
}
export default {
    install: function (Vue: any, _options: any) {
        Vue.prototype.$event = new EventBus()
    }
}
