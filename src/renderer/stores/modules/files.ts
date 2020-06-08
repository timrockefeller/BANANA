import FileTree from  '../../utils/FileTree'

const state:any = {
  // tree: new FileTree('.'),
  activeFile: null,
  activeIndex: 0,
  activeLine: null,
  search: ''
}

const getters = {
  tree: (state:any) => state.tree,
  activeFile: (state:any) => state.activeFile,
  activeIndex: (state:any) => state.activeIndex,
  activeLine: (state:any) => state.activeLine,
  search: (state:any) => state.search
}

const actions = {
  // 文件更新状态响应
  setFiles ({ commit }: any, data: any) {
    commit('SET_FILES', data)
  },
  createFile ({ commit }: any, data: any) {
    commit('CREATE_FILE', data)
  },
  deleteFile ({ commit }: any, data: any) {
    commit('DELETE_FILE', data)
  },
  createVersion ({ commit }: any, data: any) {
    commit('CREATE_VERSION', data)
  },

  // 当前文件
  setFile ({ commit }: any, data: any) {
    commit('SET_FILE', data)
    commit('CHNAGE_INDEX', 0)
  },

  // 当前行
  setLine ({ commit }: any, line: any) {
    commit('SET_LINE', line)
  },

  changeIndex ({ commit }: any, index: any) {
    commit('CHNAGE_INDEX', index)
  },

  // 搜索文件
  searchFile ({ commit }: any, data: any) {
    commit('SEARCH_FILE', data)
  }
}

const mutations = {
  SET_FILES (state: { tree: { addFile: (arg0: any, arg1: any) => void; getTree: (arg0: boolean) => void } }, data: any[]) {
    // state.tree = new FileTree({ rmEmpty: true })
    state.tree = new FileTree('.')
    data.length && data.map((file: { isNew: boolean; isChanged: boolean; active: boolean; path: { full: any } }, _index: any) => {
      file.isNew = false
      file.isChanged = false
      file.active = false
      state.tree.addFile(file.path.full, file)
    })

    if (process.env.NODE_ENV !== 'production') {
      state.tree.getTree(true)
    }
  },

  CREATE_FILE (state: { tree: { addFile: (arg0: any, arg1: any) => void; getTree: (arg0: boolean) => void } }, data: { isNew: boolean; isChanged: boolean; active: boolean; path: { full: any } }) {
    data.isNew = true
    data.isChanged = false
    data.active = false

    state.tree.addFile(data.path.full, data)

    if (process.env.NODE_ENV !== 'production') {
      state.tree.getTree(true)
    }
  },

  DELETE_FILE (state: { tree: { rmFile: (arg0: any) => void; getTree: (arg0: boolean) => void } }, data: { path: { full: any } }) {
    state.tree.rmFile(data.path.full)

    if (process.env.NODE_ENV !== 'production') {
      state.tree.getTree(true)
    }
  },

  CREATE_VERSION (state: { tree: { getFile: (arg0: any) => any } }, data: { file: any; version: any }) {
    const file = state.tree.getFile(data.file)

    if (file) {
      file.versions.unshift(data.version)
      file.isChanged = true
    }
  },

  SET_FILE (state: { activeFile: any; tree: { getFile: (arg0: any) => any } }, path: any) {
    // 路径不存在
    if (!path) {
      if (state.activeFile) {
        state.activeFile.active = false
      }
      state.activeFile = null
    } else {
      const file:any = state.tree.getFile(path)
      if (!state.activeFile || state.activeFile.id !== file.id) {
        if (state.activeFile) {
          state.activeFile.active = false
        }

        state.activeFile = file
        state.activeFile.active = true
      }

      state.activeFile.isNew = false
      state.activeFile.isChanged = false
    }
  },

  SET_LINE (state: { activeLine: any }, line: any) {
    state.activeLine = line
  },

  CHNAGE_INDEX (state: { activeIndex: any }, index: any) {
    state.activeIndex = index
  },

  SEARCH_FILE (state: string, data: any) {
    state.search = data
  }
}

export default {
  namespaced: true,
  state,
  getters,
  actions,
  mutations
}
