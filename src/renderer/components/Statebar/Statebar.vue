<template>
  <div class="footer">
  行：{{this.row}} 列：{{this.col}} 
  <select v-model="myVal" @change="changeOption($event)">
  <option v-for="(item,index) in EncodeType" :key="index" :value="item">
    {{item}}
    </option>
</select>
  </div>  
</template>

<script lang="ts">
import {Vue, Component} from 'vue-property-decorator'
import * as Action from '../../utils/definations/action'
import $event from '../../utils/command'
import {EncodeType} from '../../utils/file'
@Component
export default class Statebar extends Vue {
    myVal:string = 'utf-8';
    EncodeType: Array<string> = EncodeType
    mounted ():void {
      let that = this
      $event.bind(Action.CURSOR_ACTIVITY, function (r:number, c:number) {
        that.row = r
        that.col = c
      })
    }
  row:number = 0
  col:number = 0
  changeOption () {
    $event.trigger(Action.CHANGE_ENCODING, this.myVal)
  }
}
</script>

<style lang="scss">
@import '@/assets/scss/def.scss';
.footer{
    font-family:$global-font;
    position:absolute;
    bottom:0;
    width:100%;
    height:20px;
    z-index: 3;
    background-color:#EEE8D5;
    text-align: right;
  }

</style>
