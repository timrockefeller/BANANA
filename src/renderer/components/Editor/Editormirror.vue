<template>
<!-- TODO 多标签？
    需要把props整合到上一级 -->
  <codemirror
  ref="cmEditor"
  v-model="code"
  :options="cmOptions"
  @change="onCmCodeChange"
  @inputRead="onModify"
  @cursorActivity="onCursorChange"
  />
</template>

<script lang="ts">
import $event from '../../utils/command'
import {Vue, Component} from 'vue-property-decorator'
import {FileContent} from '../../utils/file'
// import base style
import 'codemirror/lib/codemirror.css'
import '@/assets/scss/code-theme/duotone-light.css'
import 'codemirror/theme/solarized.css'
// language
import 'codemirror/mode/javascript/javascript.js'
import 'codemirror/mode/python/python.js'
import 'codemirror/mode/clike/clike.js'
import 'codemirror/mode/markdown/markdown.js'
import 'codemirror/mode/htmlmixed/htmlmixed.js'
// require active-line.js
import 'codemirror/addon/selection/active-line.js'
// styleSelectedText
import 'codemirror/addon/selection/mark-selection.js'
import 'codemirror/addon/search/searchcursor.js'
// hint
import 'codemirror/addon/hint/show-hint.js'
import 'codemirror/addon/hint/show-hint.css'
import 'codemirror/addon/hint/javascript-hint.js'
import 'codemirror/addon/hint/html-hint.js'
import 'codemirror/addon/hint/anyword-hint.js'
// highlightSelectionMatches
import 'codemirror/addon/scroll/annotatescrollbar.js'
import 'codemirror/addon/search/matchesonscrollbar.js'

import 'codemirror/addon/search/match-highlighter.js'
// keyMap
import 'codemirror/addon/edit/matchbrackets.js'
import 'codemirror/addon/comment/comment.js'
import 'codemirror/addon/dialog/dialog.js'
import 'codemirror/addon/dialog/dialog.css'

import 'codemirror/addon/search/search.js'
import 'codemirror/keymap/sublime.js'
// foldGutter
import 'codemirror/addon/fold/foldgutter.css'
import 'codemirror/addon/fold/brace-fold.js'
import 'codemirror/addon/fold/comment-fold.js'
import 'codemirror/addon/fold/foldcode.js'
import 'codemirror/addon/fold/foldgutter.js'
import 'codemirror/addon/fold/indent-fold.js'
import 'codemirror/addon/fold/markdown-fold.js'
import 'codemirror/addon/fold/xml-fold.js'

import * as Action from '../../utils/definations/action'
// eslint-disable-next-line no-unused-vars
const ipcPromise = require('ipc-promise')
const VueCodemirror = require('@/components/vue-codemirror')
const codemirror = VueCodemirror.codemirror
const ipc = require('electron').ipcRenderer
@Component({
  components: {
    codemirror
  }
})
export default class Editormirror extends Vue {
    file:FileContent = new FileContent('');
    cmOptions:any = {
      tabSize: 4,
      indentUnit: 4,
      styleActiveLine: false,
      lineNumbers: true,
      styleSelectedText: false,
      line: true,
      foldGutter: true,
      gutters: ['CodeMirror-linenumbers', 'CodeMirror-foldgutter'],
      highlightSelectionMatches: { showToken: /\w/, annotateScrollbar: true },
      mode: 'text/javascript',
      // hint.js options
      hintOptions: {
        // 当匹配只有一项的时候是否自动补全
        completeSingle: false
      },
      matchBrackets: true,
      showCursorWhenSelecting: true,
      theme: 'solarized light', // 'duotone-light',
      extraKeys: { 'Ctrl': 'autocomplete' }
    }
    code:string='';
    get editor ():any {
      let edi:any = this.$refs.cmEditor
      return edi.editor
    }
    mounted ():void {
      this.code = ''
      this.cmOptions.mode = 'text'
      console.log(this.editor)
      let that = this
      // 处理命令事件
      // 打开文件
      $event.bind(Action.OPENFILE, function () {
        if (that.file.modified) {
          $event.trigger(Action.IPC_CONFIRM_OPENFILE, true)
        } else {
          ipc.send(Action.OPENFILE)
        }
      })
      $event.bind(Action.IPC_CONFIRM_OPENFILE, function (rc:boolean) {
        if (rc) {
          ipc.send(Action.IPC_OPEN_FILE_DIAL)
        }
      })
      $event.bind(Action.OPENFILE_TREE, function (path:string[]) {
        if (that.file.modified) {
          ipc.send(Action.IPC_CONFIRM_OPENFILE_TREE, path)
        } else {
          $event.trigger(Action.IPC_OPEN_FILE_CALLBACK, path[0])
        }
      })
      $event.bind(Action.IPC_OPEN_FILE_CALLBACK, function (path:string) {
        if (path) {
          that.file = new FileContent(path, that.file.encoding)
          that.code = that.file.data
          that.cmOptions.mode = that.file.language
          that.file.modified = false
        }
      })
      // 保存文件
      $event.bind(Action.SAVEFILE, function () {
        console.log(that.file.path)
        if (that.file.path === '') {
          $event.trigger(Action.SAVEFILEAS)
        } else {
          that.file.data = that.code
          that.file.onSave()
        }
      })
      // 另存为文件
      $event.bind(Action.SAVEFILEAS, function () {
        ipc.send(Action.IPC_SAVE_FILE_DIAL)
      })
      $event.bind(Action.IPC_SAVE_FILE_CALLBACK, function (filepath:string) {
        if (filepath) {
          that.file.setPath(filepath)
          that.file.data = that.code
          that.file.onSave()
        }
      })
      // TODO editor命令
      // 新建文件
      $event.bind(Action.NEWFILE, function () {
        if (that.file.modified === true) {
          ipc.send(Action.NEWFILE)
        }
      })
      $event.bind(Action.IPC_CONFIRM_NEWFILE, function (rc:boolean) {
        if (rc) {
          that.file = new FileContent('')
          that.code = ''
          that.file.modified = false
        }
      })
      // 更改编码
      $event.bind(Action.CHANGE_ENCODING, function (_encoding:string) {
        that.file.changeEncoding(_encoding)
        if (that.file.modified) {
          ipc.send(Action.CHANGE_ENCODING)
        } else {
          that.file.loadData()
          that.code = that.file.data
          that.file.modified = false
        }
      })
      $event.bind(Action.IPC_CHANGE_ENCODING_METHOD, function (method:number) {
        switch (method) {
          case 0:// 重新加载
            that.file.loadData()
            that.code = that.file.data
            that.file.modified = false
            break
          case 1:// 通过编码保存
            that.file.modified = true
            that.file.onSave()
            break
          default:
            break
        }
      })
    }
    onCmCodeChange (_val:string):void {
    //   this.code = _val
      console.log(this.editor.getValue())
    }

    onModify () {
      this.file.modified = true
    }
    onCursorChange (_val:any) {
      let row:number = _val.doc.getCursor().line + 1
      let col:number = _val.doc.getCursor().ch + 1
      $event.trigger(Action.CURSOR_ACTIVITY, row, col)
    }
}
</script>

<style lang='scss'>
@import "~@/assets/scss/def.scss";
@import "~@/assets/scss/code-theme/duotone-light.css";
.vue-codemirror, .CodeMirror{
    height:100%;
    font-family: $global-font;
    font-size: 16px;
}
</style>
