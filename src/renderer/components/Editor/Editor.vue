<template>
  <div class="editor-frame">
    <div class="text-browser" ref="innertext" @click="mouseEvent">
      Sample Text <span style="color:#F00" >Like We Have</span> Sun Shine!
    </div>
    <textarea 
      id="editor-inserter"
      v-model="keyput"
      ref="inserter"
      v-if="onfocus"
      :style="inserterStyle"
    ></textarea>
  </div>
</template>

<script lang="ts">
import {Vue, Component} from 'vue-property-decorator'

@Component({
  name: 'editor-page'
})
export default class Editor extends Vue {
    inserterPosX:Number = 0
    inserterPosY:Number = 0
    onfocus:Boolean = true
    get keyput () {
      return ''
    }
    set keyput (value:String) {
      // TODO backspace & so on
      let elInnertext: any = this.$refs.innertext
      let elInserter: any = this.$refs.inserter
      elInnertext.append(value)
      elInserter.value = ''
    }
    get inserterStyle () {
      return 'top:' + this.inserterPosY + 'px;left:' + this.inserterPosX + 'px'
    }
    mouseEvent (e:MouseEvent):void {
      this.inserterPosX = e.offsetX
      this.inserterPosY = Math.floor(e.offsetY / 15) * 15
      let elInserter:any = this.$refs.inserter
      elInserter.focus()
    }
}
</script>

<style>
.editor-frame{
    margin:0
}

.text-browser{
  position:absolute;
  width:100%;
  height:70em;
  top:0;
  left:0;
  background: rgb(255, 255, 215);
  font-size: 15px;
  cursor: text;
}

#editor-inserter{
  position:relative;
  outline:none;
  resize:none; 
  background:none;
  padding:0;
  border:none;
  overflow-y:hidden;
  overflow-x:hidden;
  caret-color: #FA0560;
  height:15px;
  width:2px;
}
</style>
