<template>
  <div class="editor-frame">
    <div class="text-browser" ref="innertext" @click="mouseEvent">
      Sample Text <span style="color:#F00" >Like We Have</span> Sun Shine!
    </div>
    <textarea 
      id="editor-inserter"
      v-model="keyput"
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
    },
    keyput: {
      get () {
        return ''
      },
      set (value) {
        // TODO backspace & so on
        this.$refs.innertext.append(value)
        this.$refs.inserter.value = ''
      }
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
.editor-frame{
    margin:0
}

.text-browser{
  position:absolute;
  width:100%;
  height:70em;
  top:0;
  left:0;
  background: rgb(255, 255, 215);
  font-size: 15px;
  cursor: text;
}

#editor-inserter{
  position:relative;
  outline:none;
  resize:none; 
  background:none;
  padding:0;
  border:none;
  overflow-y:hidden;
  overflow-x:hidden;
  caret-color: #FA0560;
  height:15px;
  width:2px;
}
</style>
