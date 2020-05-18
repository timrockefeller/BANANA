interface Command {
    execute(): void;
}
declare class EventBus {
    /**
     * bind
     */
    bind(): void;
}
declare module 'vue/types/vue' {
    interface VueConstructor {
        $event: EventBus;
    }
}
