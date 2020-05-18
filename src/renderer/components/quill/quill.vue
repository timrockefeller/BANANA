<template>
 <div class="edit_container">
  <quill-editor
   v-model="content"
   ref="myQuillEditor"
   :options="editorOption"
   @blur="onEditorBlur($event)" @focus="onEditorFocus($event)"
   @change="onEditorChange($event)">
  </quill-editor>
  <button v-on:click="saveHtml">保存</button>
 </div>
</template>
<script>
export default {
  name: 'App',
  data () {
    return {
      content: `<p>hello world</p>`,
      editorOption: {}
    }
  },
  computed: {
    editor () {
      return this.$refs.myQuillEditor.quill
    }
  },
  methods: {
    onEditorReady (editor) {
    },
    onEditorBlur () {},
    onEditorFocus () {},
    onEditorChange () {},
    saveHtml: function (event) {
      alert(this.content)
    }
  }
}
</script>

<style>
#app {
 font-family: 'Avenir', Helvetica, Arial, sans-serif;
 -webkit-font-smoothing: antialiased;
 -moz-osx-font-smoothing: grayscale;
 text-align: center;
 color: #2c3e50;
 margin-top: 60px;
}
</style>
