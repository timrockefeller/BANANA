<template>
  <div class="folder" v-show="isShow">
    <a href="#" class="name" :style="{ paddingLeft: (depth + 1) * 20 + 'px' }" @click="open = !open">
      <Icon class="icon" :extension="open ? 'folder-active' : 'folder'"/>
      <span class="text">
        <span v-for="(item, index) in nameArr.arr" :key="index"><span class="label">{{ item }}</span><b v-if="index !== nameArr.arr.length - 1">{{nameArr.keyword}}</b></span>
      </span>
    </a>
    <div v-show="open">
      <Folder ref="child" v-for="(item, index) in content.folders" :key="'folder -' + index" :content="item" :depth="depth + 1" :directory="fullPath + '/'" />
      <File ref="child" v-for="(item, index) in content.files.concat().sort((a, b) => a.name > b.name)" :key="'file -' + index" :content="item" :depth="depth + 1" />
    </div>
  </div>
</template>

<script>
import Icon from '../Icon/index.vue'
import File from '../File/index.vue'
import { mapGetters } from 'vuex'

export default {
  name: 'Folder',
  components: {
    Icon,
    File
  },
  props: {
    depth: Number,
    directory: {
      type: String,
      default: ''
    },
    content: Object
  },
  data () {
    return {
      open: true
    }
  },
  computed: {
    ...mapGetters('files', ['search']),
    fullPath () {
      return `${this.directory}${this.content.name}`
    },
    nameArr () {
      if (this.search) {
        if (this.search.split('/').indexOf(this.content.name) !== -1) {
          return {
            arr: ['', ''],
            keyword: this.content.name
          }
        } else {
          let keyword = this.search.split('/').pop()

          return {
            arr: this.content.name.split(keyword),
            keyword
          }
        }
      } else {
        return {
          arr: [this.content.name],
          keyword: ''
        }
      }
    },
    isShow () {
      // child node need to display
      if (this.$refs.child && this.$refs.child.find(item => item.isShow)) {
        return true
      }

      // judge by search input
      if (this.search) {
        return this.nameArr.length > 1
      } else {
        return true
      }
    }
  }
}
</script>

<style lang="scss" scoped>
.folder {
  display: inline-block;
  min-width: 100%;
  .name {
    display: block;
    padding: 0px;
    height: 18px;
    line-height: 16px;
    font-size: 15px;
    white-space: nowrap;
    color:#333333;
    font-weight: bold;
    text-decoration: none;

    .icon {
      opacity: .6;
      width: 12px;
      height: 12px;
    }

    .text {
      display: inline-block;
      padding: 0 21px 0 6px;
      .label {
        opacity: .6;
        font-weight: 300;
      }
      b {
        color: #FDF6E3;
        font-weight: bold;
      }
    }

    &:hover {
      .icon {
        opacity: 1;
      }

      .text {
        .label {
          color:black;
          opacity: 1;
        }
      }
    }
  }
}
</style>
