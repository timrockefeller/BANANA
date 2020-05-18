<template>
  <codemirror
  ref="cmEditor"
  v-model="code"
  :options="cmOptions"
  @input="onCmCodeChange"
  />
</template>

<script lang="ts">
import {Vue, Prop, Component} from 'vue-property-decorator'
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
    @Prop(FileContent) file:FileContent = new FileContent('./test.py');
    cmOptions = {
      tabSize: 4,
      mode: 'python',
      theme: '3024-day',
      lineNumbers: true,
      line: true
      // more CodeMirror options...
    }
    code:string='const i=0;';
    get codemirror ():any {
      return this.$refs.cmEditor
    }
    created () {
    }
    onCmCodeChange (_val:string) {
      this.code = _val
    }
}
</script>

<style>

</style>
