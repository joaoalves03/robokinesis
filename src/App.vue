<script setup lang="ts">
import {ref, shallowRef} from 'vue';
import PhaserGame from './game/PhaserGame.vue';
import In_game from "./components/in_game.vue"
import Main_menu from "@/components/main_menu.vue"
import {EventBus} from "@/game/EventBus"

const phaserRef = ref();

const ui = shallowRef(Main_menu);

EventBus.on("play", () => {
    ui.value = In_game
})

</script>

<template>
    <PhaserGame ref="phaserRef"/>
    <component :is="ui"></component>
</template>

<style lang="postcss">
@font-face {
    font-family: 'AppleIIPro';
    src: url('/assets/Apple II Pro.otf');
    font-weight: normal;
    font-style: normal;
}

body {
    @apply h-full bg-black flex items-center;
}

#app {
    font-family: 'AppleIIPro',sans-serif;
    @apply relative aspect-video max-h-screen w-full bg-black flex items-center overflow-hidden;
}
</style>