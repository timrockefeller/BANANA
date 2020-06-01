<template>
  <div class="footer">
      行：{{this.row}} 列：{{this.col}}
  </div>
</template>

<script lang="ts">
import {Vue, Component} from 'vue-property-decorator'
import * as Action from '../../utils/definations/action'
import $event from '../../utils/command'
@Component
export default class Statebar extends Vue {
  mounted ():void {
    let that = this
    $event.bind(Action.CURSOR_ACTIVITY, function (r:number, c:number) {
      that.row = r
      that.col = c
    })
  }
  row:number = 0
  col:number = 0
}
</script>

<style>
.footer{
    position:absolute;
    bottom:0;
    width:100%;
    height:20px;
    z-index: 3;
    background-color:aqua
  }
</style>
