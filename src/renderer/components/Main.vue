<template>
  <main>
    <!-- Menu Bar -->

    <!--editor></editor-->
    <quill></quill>
    <!-- Process Bar -->

  </main>
</template>

<script>
//import Editor from './Editor/Editor.vue'
import Quill from 'quill'
import quill from 'quill/quill.js'
Quill.register('quill/quill', quill)
export default {
  name: 'top',
  components: { quill }
}
</script>

<style>

</style>
