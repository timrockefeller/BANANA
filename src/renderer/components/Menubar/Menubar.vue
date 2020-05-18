<template>
    <div class="menu-content">
        <div class="menu-system">
            <i title="最小化" class="menu-button mini noDrag" @click="setWin('min')"></i>
            <i title="最大化" class="menu-button max noDrag" @click="setWin('max')"></i>
            <i title="关闭" class="menu-button close noDrag" @click="setWin('close')"></i>
        </div>
    </div>
</template>

<script lang="ts">
import {Vue, Component} from 'vue-property-decorator'

@Component
export default class Filetree extends Vue {

}
</script>

<style lang="scss">
    .menu-content{
        height:3em;
    }
    .menu-button{
        height:100%;
    }
    .menu-button:hover{
        background:rgba(0,0,0,0.02);
    }
</style>
