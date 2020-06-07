interface Command {
    action: string;
    execute: Function;
}
declare class EventBus {
    constructor();
    cmds: Command[];
    bind(cmd: string, func: Function): void;
    trigger(action: string, ..._args: any): Promise<void>;
}
declare let $event: EventBus;
export default $event;
