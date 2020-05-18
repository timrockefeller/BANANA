<template>
  <main>
    <!-- Menu Bar -->
    <div>
      <div>
        <fieldset style="border-width: 1px; border-color: #bbbbbb; width:100%; height:220">
          <legend>菜单栏</legend>
          <Menubar></Menubar>
        </fieldset>
      </div>
      <div style="float:left;  width:25% ">
        <fieldset style="border-width: 1px; border-color: #bbbbbb; height:1000px;">
          <legend>文件夹</legend>
          <Filetree ></Filetree>
        </fieldset>
      </div>
      <div style="float:right; width:75%">
        <fieldset style="border-width: 1px; border-color: #bbbbbb;  height:1000px">
          <legend>编辑区</legend>
          <editor></editor>
        </fieldset>
      </div>
      
    </div>
    <!-- Process Bar -->
      
  </main>
</template>

<script lang="ts">
import {Vue, Component} from 'vue-property-decorator'
import Editor from './Editor/Editor.vue'
import Filetree from './Filetree/Filetree.vue'
import Menubar from './Menubar/Menubar.vue'
@Component({
  name: 'top',
  components: {
    'Editor': Editor,
    'Filetree': Filetree,
    'Menubar': Menubar
  }
})

export default class App extends Vue {
  created () {
  }
}
</script>

<style>

</style>
