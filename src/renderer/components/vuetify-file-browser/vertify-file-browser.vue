<template>
    <file-browser :axiosConfig="{baseURL: 'http://localhost:8081'}" />
</template>

<script>
const FileBrowser = require('vuetify-file-browser')

export default {
  components: {
    FileBrowser
  }
}
</script>
