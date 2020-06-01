declare const _default: {
    namespaced: boolean;
    state: any;
    getters: {
        tree: (state: any) => any;
        activeFile: (state: any) => any;
        activeIndex: (state: any) => any;
        activeLine: (state: any) => any;
        search: (state: any) => any;
    };
    actions: {
        setFiles({ commit }: any, data: any): void;
        createFile({ commit }: any, data: any): void;
        deleteFile({ commit }: any, data: any): void;
        createVersion({ commit }: any, data: any): void;
        setFile({ commit }: any, data: any): void;
        setLine({ commit }: any, line: any): void;
        changeIndex({ commit }: any, index: any): void;
        searchFile({ commit }: any, data: any): void;
    };
    mutations: {
        SET_FILES(state: {
            tree: {
                addFile: (arg0: any, arg1: any) => void;
                getTree: (arg0: boolean) => void;
            };
        }, data: any[]): void;
        CREATE_FILE(state: {
            tree: {
                addFile: (arg0: any, arg1: any) => void;
                getTree: (arg0: boolean) => void;
            };
        }, data: {
            isNew: boolean;
            isChanged: boolean;
            active: boolean;
            path: {
                full: any;
            };
        }): void;
        DELETE_FILE(state: {
            tree: {
                rmFile: (arg0: any) => void;
                getTree: (arg0: boolean) => void;
            };
        }, data: {
            path: {
                full: any;
            };
        }): void;
        CREATE_VERSION(state: {
            tree: {
                getFile: (arg0: any) => any;
            };
        }, data: {
            file: any;
            version: any;
        }): void;
        SET_FILE(state: {
            activeFile: any;
            tree: {
                getFile: (arg0: any) => any;
            };
        }, path: any): void;
        SET_LINE(state: {
            activeLine: any;
        }, line: any): void;
        CHNAGE_INDEX(state: {
            activeIndex: any;
        }, index: any): void;
        SEARCH_FILE(state: string, data: any): void;
    };
};
export default _default;
