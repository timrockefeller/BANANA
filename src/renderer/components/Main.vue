<template>
  <main>
    <!-- Menu Bar -->
    <div class="split-zip">
    <Split v-model="splitFactor">
        <div slot="left" class="split-pane">
            <filetree></filetree>
        </div>
        <div slot="right" class="split-pane">
            <editor></editor>
        </div>
    </Split>
    </div>
      <!-- <div>
        <fieldset style="border-width: 1px; border-color: #bbbbbb; width:100%; height:220">
          <legend>菜单栏</legend>
          <Menubar></Menubar>
        </fieldset>
      </div> -->
      <!-- <div class="box"> -->
        <!-- <fieldset style="border-width: 1px; border-color: #bbbbbb; height:1000px;">
          <legend>文件夹</legend> -->
          
        <!-- </fieldset> -->
      <!-- </div>
      <div class="box"> -->
        <!-- <fieldset style="border-width: 1px; border-color: #bbbbbb;  height:1000px">
          <legend>编辑区</legend> -->
          
        <!-- </fieldset> -->
      <!-- </div>
      
    </div> -->
    <!-- Process Bar -->
      
  </main>
</template>

<script lang="ts">
import {Vue, Component} from 'vue-property-decorator'
import Editor from './Editor/Editor.vue'
import Filetree from './Filetree/Filetree.vue'
import Menubar from './Menubar/Menubar.vue'
@Component({
  components: {Editor, Filetree, Menubar}
})
export default class App extends Vue {
  created () {
  }
  name:string= 'top'
  splitFactor:Number = 0.25
}
</script>

<style lang="scss">
$global-split-factor : 25%;
.split-zip {
    position: absolute;
    height: 100%;
    width: 100%;
    overflow: hidden;
}
.split-pane{
    // position:absolute;
    height:100%;
    top:0;
}
.ivu-split-trigger-vertical{
    opacity: 0;
}
</style>
