<template>
  <div class="file-tree">
    <Loading v-if="isLoading" :text="'File Loading...'"></Loading>
    <!-- <div class="file-empty" v-if="tree.filesCount === 0">
      <p>NO FILE. WAIT FOR LOADING.</p>
    </div> -->
    <div class="file-container">
      <input type="text" class="search" v-model="searchInput" placeholder="Search Input...">
      <div class="content">
        <Folder v-for="(folder, index) in tree.folders" :key="index" :content="folder" :depth="0" />
        <File ref="child" v-for="(item, index) in tree.files.concat().sort((a, b) => a.name > b.name)" :key="'file -' + index" :content="item" :depth="0" />
      </div>
    </div>
  </div>
</template>

<script>
import Loading from '../Loading/index.vue'
import Folder from './Folder/index.vue'
import File from './File/index.vue'
import { mapGetters, mapActions } from 'vuex'
import FileTree from '../../utils/FileTree'
import $event from '../../utils/command'
import * as Action from '../../utils/definations/action'
export default {
  name: 'FileTree',
  components: {
    Loading,
    Folder,
    File
  },
  data () {
    return {
      searchInput: '',
      tree: new FileTree('C:\\Users\\tim72\\Desktop\\test')
    }
  },
  computed: {
    ...mapGetters(['isLoading'])
    // ...mapGetters('files', ['tree'])
  },
  watch: {
    searchInput: 'searchFile'
  },
  methods: {
    ...mapActions('files', ['searchFile'])
  },
  mounted () {
    let that = this
    $event.bind(Action.OPENDIR, function (path) {
      that.tree = new FileTree(path[0])
    })
  }
}
</script>

<style lang="scss" scoped>
.file-tree {
  position: relative;
  background:dimgray;
  .file-empty {
    p {
      font-size: 14px;
      font-weight: 300;
      text-align: center;
    }
  }
  .file-container {
    width: 100%;
    height: 100%;
    display: flex;
    flex-direction: column;
    overflow: hidden;
    .search {
      display: block;
      flex: 0 0 40px;
      padding-left: 20px;
      margin-bottom: 10px;
      font-size: 14px;
      line-height: 40px;
      border-bottom: 1px solid rgba(255,255,255,0.2);
    }
    .content {
      flex: 1;
      overflow: auto;
      margin-right: -15px;
    }
  }
}
</style>
