interface Command {
    action: string;
    execute: Function;
}
declare class EventBus {
    constructor();
    cmds: Command[];
    bind(cmd: string, func: Function): void;
    trigger(action: string, ..._args: any): void;
}
declare let $event: EventBus;
export default $event;
