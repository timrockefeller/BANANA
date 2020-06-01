<template>
  <div class="footer">

  </div>
</template>

<script lang="ts">
import {Vue, Component} from 'vue-property-decorator'
@Component
export default class Statebar extends Vue {
  created () {
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
