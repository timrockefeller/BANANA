<template>
<!-- TODO 多标签？
    需要把props整合到上一级 -->
  <codemirror
  ref="cmEditor"
  v-model="code"
  :options="cmOptions"
  @change="onCmCodeChange"
  />
</template>

<script lang="ts">
import {Vue, Component} from 'vue-property-decorator'
import { codemirror } from 'vue-codemirror'
import {FileContent} from '../../utils/file'
// import base style
import 'codemirror/lib/codemirror.css'
import 'codemirror/theme/duotone-light.css'
// language
import 'codemirror/mode/javascript/javascript.js'
// import 'codemirror/mode/python/python.js'
// require active-line.js
import 'codemirror/addon/selection/active-line.js'
// styleSelectedText
import 'codemirror/addon/selection/mark-selection.js'
import 'codemirror/addon/search/searchcursor.js'
// hint
import 'codemirror/addon/hint/show-hint.js'
import 'codemirror/addon/hint/show-hint.css'
import 'codemirror/addon/hint/javascript-hint.js'
// highlightSelectionMatches
import 'codemirror/addon/scroll/annotatescrollbar.js'
import 'codemirror/addon/search/matchesonscrollbar.js'

import 'codemirror/addon/search/match-highlighter.js'
// keyMap
import 'codemirror/mode/clike/clike.js'
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

@Component({
  components: {
    codemirror
  }
})
export default class Editormirror extends Vue {
    file:FileContent = new FileContent('./.eslintrc.js');
    cmOptions:any = {
      tabSize: 4,
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
      theme: 'duotone-light',
      extraKeys: { 'Ctrl+.': 'autocomplete' }
    }
    code:string='const int a;';
    get editor ():any {
      let edi:any = this.$refs.cmEditor
      return edi
    }
    mounted ():void {
      this.file = new FileContent('./.eslintrc.js')
      this.code = this.file.data
      this.cmOptions.mode = this.file.language
      // FIXME 这咋没有高亮？
      console.log(this.editor)
    }
    onCmCodeChange (_val:string):void {
    //   this.code = _val
    }
}
</script>

<style lang='scss'>
@import "~@/assets/scss/def.scss";
.vue-codemirror, .CodeMirror{
    height:100%;
    font-family: $global-font;
    font-size: 16px;
}
</style>
