// import Vue from 'vue'

import { CURSOR_ACTIVITY } from './definations/action';

// import { INSERT }from './definatrions/action'
interface Command {
    action: string
    execute: Function
}

class EventBus {
    constructor() {

    }
    cmds: Command[] = []
    public bind(cmd: string, func: Function): void {
        let c: Command = {
            action: cmd,
            execute: func
        }
        this.cmds.push(c);
    }
    public trigger(action: string, ..._args: any): void {
        for (let cmd of this.cmds) {
            if (cmd.action == action) {
                cmd.execute(..._args)
                console.log(cmd.action + ' ' + 'use' )
            }
        }
    }
}
let $event: EventBus = new EventBus()
export default $event 
