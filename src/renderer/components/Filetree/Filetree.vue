<template>
  <div class="filetree-content">

  </div>
</template>

<script lang="ts">
import {Vue, Component} from 'vue-property-decorator'
// TODO 文件树
// 没有定义@types的用require导入试试？
@Component
export default class Filetree extends Vue {
    name:string ='Filetree'
    create () {}
}
</script>

<style lang="scss">
.filetree-content{
    position: absolute;
    width:100%;
    background:#CCC;
    height:100%;
}
</style>
