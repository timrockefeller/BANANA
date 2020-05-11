<template>
  <div class="editor-frame">
    <div class="text-browser" @click="mouseEvent">
      Sample Text <span style="color:#F00" >Like We Have</span> Sun Shine!
    </div>
    <textarea 
      id="editor-inserter"
      ref="inserter"
      v-if="onfocus"
      :style="inserterStyle"
    ></textarea>
  </div>
</template>

<script>
export default {
  name: 'editor-page',
  data () {
    return {
      inserterPosX: 0,
      inserterPosY: 0,
      onfocus: true
    }
  },
  computed: {
    inserterStyle () {
      return 'top:' + this.inserterPosY + 'px;left:' + this.inserterPosX + 'px'
    }
  },
  methods: {
    mouseEvent: function (e) {
      this.inserterPosX = e.offsetX
      this.inserterPosY = Math.floor(e.offsetY / 15) * 15
      this.$refs.inserter.focus()
    }
  }
}
</script>

<style>
.text-browser{
  position:absolute;
  width:100%;
  height:70em;
  left:0;
  background: rgb(255, 255, 215);
  font-size: 15px;
}
#editor-inserter{
  position:relative;
  outline:none; 
  resize:none; 
  background:transparent; 
  border-color:transparent;
  overflow-y:hidden;
  overflow-x:hidden;
  caret-color: #FA0560;
}
</style>
