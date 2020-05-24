<template>
  <codemirror
  ref="cmEditor"
  v-model="code"
  :options="cmOptions"
  @input="onCmCodeChange"
  />
</template>

<script lang="ts">
import {Vue, Component} from 'vue-property-decorator'
import { codemirror } from 'vue-codemirror'
import {FileContent} from '../../utils/file'
// import base style
import 'codemirror/lib/codemirror.css'
// import more codemirror resource...
import 'codemirror/mode/javascript/javascript.js'
import 'codemirror/mode/python/python.js'
import 'codemirror/addon/fold/foldcode.js'
import 'codemirror/addon/fold/foldgutter.js'
import 'codemirror/addon/fold/brace-fold.js'
import 'codemirror/addon/fold/xml-fold.js'
import 'codemirror/addon/fold/indent-fold.js'
import 'codemirror/addon/fold/markdown-fold.js'
import 'codemirror/addon/fold/comment-fold.js'
import 'codemirror/addon/hint/show-hint.css'
import 'codemirror/addon/hint/show-hint.js'
import 'codemirror/addon/hint/javascript-hint.js'

@Component({
  components: {
    codemirror
  }
})
export default class Editormirror extends Vue {
    file:FileContent = new FileContent('./test.py');
    cmOptions = {
      tabSize: 4,
      mode: 'text/javascript',
      theme: 'duotone-light',
      lineNumbers: true,
      line: true,
      styleActiveLine: true
      // more CodeMirror options...
    }
    code:string='const';
    get codemirror ():Vue | Element | Vue[] | Element[] {
      return this.$refs.cmEditor
    }
    mounted ():void {
      this.file = new FileContent('./test.py')
      this.code = this.file.data
      this.cmOptions.mode = this.file.language
    }
    onCmCodeChange (_val:string):void {
      this.code = _val
    }
}
</script>

<style lang='scss'>
@import "~@/assets/scss/code-theme/duotone-light.css";
@import "~@/assets/scss/def.scss";
.vue-codemirror, .CodeMirror{
    height:100%;
    font-family: $global-font;
    font-size: 16px;
}
</style>
