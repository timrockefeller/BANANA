<template>
  <div class="editor-frame"  @keydown.tab="tabEvent">
    <div class="text-browser" ref="innertext" contenteditable="true" @click="mouseEvent">
      <ol class="text-inner"><li v-for="(dat, key) in file.data" :key="key">
          <div class="line-prefix" contenteditable="false">{{key+1}}</div>
          <div class="line-text" v-html="parsetext(dat)"></div>
          </li></ol>
      <div 
      id="editor-inserter"
      ref="inserter"
      v-if="onfocus"
      :style="inserterStyle"
      style="display:none"></div>
    </div>
    
  </div>
</template>

<script lang="ts">
import {Vue, Prop, Component} from 'vue-property-decorator'
import {FileContent} from '../../utils/file'

@Component
export default class Editor extends Vue {
  @Prop(String) name : String = 'editor-page';
  @Prop(FileContent) file:FileContent = new FileContent('./test.py');
  inserterPosX: Number = 0;
  inserterPosY: Number = 0;
  onfocus: Boolean = true;

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
    this.inserterPosY = Math.floor(e.offsetY / 17) * 17 + 1
  }
  tabEvent (_e:KeyboardEvent):void {
    let elInnertext:any = this.$refs.innertext
    elInnertext.selectionStart = 0
  }
  parsetext (ori:string) {
    return ori.replace(/\s/g, '&nbsp;')
  }
}
</script>

<style lang="scss">
@import "~@/assets/scss/def.scss";
.editor-frame{
    margin:0
}

.text-browser{
  position:relative;
  width:100%;
  height:70em;
  top:0;
  left:0;
  font-family: $global-font;
  background: $global-white;
  font-size: 15px;
  line-height: 17px;
  cursor: text;
}
.text-inner{
    position: absolute;
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
  background: $editor-curse;
  height:15px;
  width:1px;
  animation-name: twinkling;
  animation-duration: 1s;
  animation-iteration-count: infinite;
}
ol{
    list-style-type:none;
    counter-reset:sectioncounter;
    padding:0 0;
    width: 100% 
}
.line-prefix{
    display: inline-block;
    width: 3em;
    padding:0 2em;
    text-align: right;
    user-select: none;
}
.line-text{
    display: inline-block;
}
</style>
