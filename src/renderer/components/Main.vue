<template>
  <main>
    <!-- Menu Bar -->

    <div class="split-zip">
    <Split v-model="splitFactor">
        <div slot="left" class="split-pane">
            <Filetree class="files"></Filetree>
        </div>
        <div slot="right" class="split-pane">
           <div slot="top" class="split-pane">
                 <editormirror></editormirror>
            </div>
            <div slot="bottom" class="demo-split-pane">
                 <TerminalView
          class = 'test'
          ref="terminal"
          :terminal="terminal"
          :cols="110"
          :rows="24"
          auto-size
          :options="{
            scrollback: 5000,
            disableStdin: true,
            useFlowControl: true
          }"
          open-links
        />
            </div>
        </div>
    </Split>
    </div>
    <Statebar></Statebar>
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
import Statebar from './Statebar/Statebar.vue'
import TerminalView from '../components/Terminal/Terminal.vue'
const ipc = require('electron').ipcRenderer
ipc
  .on(Action.NEWFILE,
    (_event:any, _message:any) => {
      $event.trigger(Action.NEWFILE)
    })
  .on(Action.IPC_CONFIRM_NEWFILE,
    (_event:any, _message:any) => {
      $event.trigger(Action.IPC_CONFIRM_NEWFILE, _message)
    })
  .on(Action.OPENFILE,
    (_event:any, _message:any) => {
      $event.trigger(Action.OPENFILE)
    })
  .on(Action.IPC_CONFIRM_OPENFILE,
    (_event:any, _message:any) => {
      $event.trigger(Action.IPC_CONFIRM_OPENFILE, _message)
    })
  .on(Action.IPC_OPEN_FILE_CALLBACK,
    (_event:any, _message:any) => {
      let path :string = _message[0]
      $event.trigger(Action.IPC_OPEN_FILE_CALLBACK, path)
    })
  .on(Action.SAVEFILE,
    (_event:any, _message:any) => {
      $event.trigger(Action.SAVEFILE)
    })
  .on(Action.IPC_SAVE_FILE_CALLBACK,
    (_event:any, _message:any) => {
      let path :string = _message
      $event.trigger(Action.IPC_SAVE_FILE_CALLBACK, path)
    })
  .on(Action.IPC_CHANGE_ENCODING_METHOD,
    (_event:any, _message:any) => {
      $event.trigger(Action.IPC_CHANGE_ENCODING_METHOD, _message)
    }
  )
  .on(Action.OPENDIR,
    (_event:any, _message:any) => {
      $event.trigger(Action.OPENDIR, _message)
    }
  )
  .on('asynchronous-reply', (event: any, arg: any) => {
    console.log(arg) // prints "pong"
  })
  .on('terminal', (event: any, arg: any) => {
    console.log(arg) // prints "pong"
  })
  .send('asynchronous-message', 'ping')

@Component({
  components: {Editor, Filetree, Menubar, Editormirror, Statebar, TerminalView}
})
export default class App extends Vue {
  created () {
  }
  name:string= 'top'
  splitFactor:Number = 0.25
  data () {
    return {
      terminal: {
        pid: 1,
        name: 'terminal',
        cols: 1000,
        rows: 1000
      }

    }
  }
}
</script>


<style lang="scss">
$global-split-factor : 25%;
.test {
  z-index: 10;
}
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
}
.files {
      height: 100%;
      width: 100%;
}
.ivu-split-trigger-vertical{
    opacity: 0;
}
.demo-split{
        height: 200px;
        border: 1px solid #dcdee2;
}
.demo-split-pane{
      position:absolute;
      bottom:0;
      width:100%;
      height:100px;
      z-index: 3;
}
</style>
