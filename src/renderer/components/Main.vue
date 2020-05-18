<template>
  <main>
    <!-- Menu Bar -->

    <editor></editor>

    <!-- Process Bar -->
      
  </main>
</template>

<script lang="ts">
import {Vue, Component} from 'vue-property-decorator'
import Editor from './Editor/Editor.vue'
@Component({
  name: 'top',
  components: {
    'Editor': Editor
  }
})

export default class App extends Vue {
  created () {
  }
}
</script>

<style>

</style>
