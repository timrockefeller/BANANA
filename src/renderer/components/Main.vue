<template>
  <main>
    <!-- Menu Bar -->
    <div class="split-zip">
    <Split v-model="splitFactor">
        <div slot="left" class="split-pane">
            <Filetree class="files"></Filetree>
        </div>
        <div slot="right" class="split-pane">
            <editormirror></editormirror>
        </div>
    </Split>
    </div>

      <div class="footer">
        
      </div>
      
  </main>
</template>

<script lang="ts">
import {Vue, Component} from 'vue-property-decorator'
import Editor from './Editor/Editor.vue'
import Editormirror from './Editor/Editormirror.vue'
import Filetree from './Filetree/index.vue'
import Menubar from './Menubar/Menubar.vue'
import * as Action from '../utils/definations/action'
import $event from '../utils/command'
const ipc = require('electron').ipcRenderer
ipc
  .on(Action.NEWFILE,
    (_event:any, _message:any) => {
      console.log('Created New File')
    })
  .on(Action.OPENFILE,
    (_event:any, _message:any) => {
      ipc.send(Action.IPC_OPEN_FILE_DIAL)
    })
  .on(Action.SAVEFILE,
    (_event:any, _message:any) => {
      ipc.send(Action.IPC_SAVE_FILE_DIAL)
    })
  .on(Action.IPC_OPEN_FILE_CALLBACK,
    (_event:any, _message:any) => {
      let path :string = _message[0]
      $event.trigger(Action.IPC_OPEN_FILE_CALLBACK, path)
    })

@Component({
  components: {Editor, Filetree, Menubar, Editormirror}
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
    height: calc(100% - 20px);
    width: 100%;
    overflow: hidden;
}
.split-pane{
    // position:absolute;
    height:100%;
    top:0;
}
.footer{
    position:absolute;
    bottom:0;
    width:100%;
    height:20px;
    z-index: 3;
    background-color:aqua
  }
.files {
      height: calc(100% - 90px);
      width: 320px;
    }
.ivu-split-trigger-vertical{
    opacity: 0;
}

</style>
