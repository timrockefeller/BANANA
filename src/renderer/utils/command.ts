// import Vue from 'vue'
// import { INSERT }from './definatrions/action'
interface Command {
    action: string
    execute(_args:any): void
}

class EventBus {
    constructor() {

    }
    cmds: Command[] = []
    public bind(cmd: Command): void {
        this.cmds.push(cmd);
    }
    public trigger(action: string, ..._args:any): void {
        for (let cmd of this.cmds) {
            if (cmd.action == action) {
                cmd.execute(_args)
            }
        }
    }
}
export default {
    install: function (Vue: any, _options: any) {
        let eventbus = new EventBus()
        Vue.prototype.$event = eventbus;
    }
}
