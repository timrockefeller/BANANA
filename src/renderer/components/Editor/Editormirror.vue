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

@Component({
  components: {
    codemirror
  }
})
export default class Editormirror extends Vue {
    file:FileContent = new FileContent('./test.py');
    cmOptions = {
      tabSize: 4,
      mode: 'python',
      theme: '3024-day',
      lineNumbers: true,
      line: true
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

<style>

</style>
