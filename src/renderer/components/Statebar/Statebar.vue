<template>
  <div class="footer">
  行：{{this.row}} 列：{{this.col}} 
  <select v-model="myVal" @change="changeOption($event)">
  <option v-for="item in Type" :key="item.value" :value="item.value">
    {{item.item}}
    </option>
</select>

  </div>  
</template>

<script lang="ts">
import {Vue, Component} from 'vue-property-decorator'
import * as Action from '../../utils/definations/action'
import $event from '../../utils/command'
// import {FileContent} from '../../utils/file'
import {EncodingChose} from '../../utils/Statebar'

@Component
export default class Statebar extends Vue {
  myVal:number = 0;
  op1:EncodingChose = new EncodingChose('utf-8', 0)
  op2:EncodingChose = new EncodingChose('gbk', 1)
  op3:EncodingChose = new EncodingChose('gb2312', 2)
  op4:EncodingChose = new EncodingChose('gb18030', 3)
  op5:EncodingChose = new EncodingChose('Big5', 4)
  op6:EncodingChose = new EncodingChose('Big5-HKSCS', 5)
  op7:EncodingChose = new EncodingChose('Shift JIS', 6)
  Type:Array<EncodingChose> = [
    this.op1, this.op2, this.op3, this.op4, this.op5, this.op6
  ]

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
    var index = this.myVal
    console.log(this.Type[index].item)
    $event.trigger(Action.CHANGE_ENCODING, this.Type[index].item)
  }
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
