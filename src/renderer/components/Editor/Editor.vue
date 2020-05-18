<template>
  <div class="editor-frame">
    <div class="text-browser" ref="innertext" @click="mouseEvent">
      <!-- <div>
      Sample Text <span class="mtk8" >Like We Have</span> Sun Shine!
      </div>
      <div>
      Multilline Text <span class="mtk6" >Test Chamber</span>.
      </div> -->
     
      <ol>
      
      <li v-for="(dat, key) in file.data" :key="key">{{ parsetext(dat) }}</li>
    
      </ol>
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
    let elInserter:any = this.$refs.inserter
    elInserter.focus()
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
ol{list-style-type:none;counter-reset:sectioncounter;}

ol li:before {
       color:rgb(60, 61, 83);
       content:counter(sectioncounter) " "; 
       counter-increment:sectioncounter;
}
</style>
