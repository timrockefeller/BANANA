<template>
  <div class="file" v-show="isShow">
    <a href="#" class="name" :class="{ active: activeFile && activeFile.id === content.id }" :style="{ paddingLeft: (depth + 1) * 20 + 'px' }" @click.prevent="setFile(content.Path)">
      <Icon class="icon" :extension="content.extension"/>
      <span class="text">
        <span v-for="(item, index) in nameArr.arr" :key="index"><span class="label">{{ item }}</span><b v-if="index !== nameArr.arr.length - 1">{{nameArr.keyword}}</b></span>
      </span>
      <span v-if="content.isNew" class="notice new">new</span>
      <span v-if="content.isChanged && !content.isNew" class="notice changed">changed</span>
    </a>
  </div>
</template>

<script>
import Icon from '../Icon/index.vue'
import { mapGetters } from 'vuex'

import $event from '../../../utils/command'
import * as Action from '../../../utils/definations/action'
export default {
  name: 'File',
  components: {
    Icon
  },
  props: {
    depth: Number,
    content: Object
  },
  computed: {
    ...mapGetters('files', ['activeFile', 'search']),
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
      if (this.search && this.content.path) {
        return this.content.path.full.indexOf(this.search) !== -1
      } else {
        return true
      }
    }
  },
  methods: {
    // ...mapActions('files', ['setFile', 'setLine'])
    setFile: function (filepath) {
      $event.trigger(Action.OPENFILE_TREE, [filepath])
    }
  }
}
</script>

<style lang="scss" scoped>
.file {
  .name {
    display: block;
    padding: 0px;
    height: 18px;
    line-height: 16px;
    font-size: 15px;
    white-space: nowrap;
    color:#333333;
    font-weight: 300;
    text-decoration: none;

    .icon {
      width: 12px;
      height: 12px;
    }

    .text {
      display: inline-block;
      padding: 0 21px 0 6px;
      .label {
        opacity: .6;
      }
      b {
        color: #FDF6E3;
        font-weight: bold;
      }
    }

    .notice {
      display: inline-block;
      height: 14px;
      padding: 0 2px;
      line-height: 14px;
      color: rgba(255, 255, 255, .6);
      font-size: 12px;
      border-radius: 8px;
      &.new {
        background-image: linear-gradient(-90deg, #6E67FD 0%, #9B52F5 100%)
      }
      &.changed {
        background-image: linear-gradient(-90deg, #FF708F 0%, #FE846F 100%)
      }
    }

    &.active {
      background: #333333
    }

    &:hover {
      .text {
        .label {
          color:#333333;
          opacity: 1;
        }
      }
    }
  }
}
</style>
