<script setup lang="ts">
import {ref, shallowRef} from 'vue';
import PhaserGame from './game/PhaserGame.vue';
import In_game from "./components/in_game.vue"
import Main_menu from "@/components/main_menu.vue"
import {EventBus} from "@/game/EventBus"
import LoadingScreen from './components/loading-screen.vue';

const phaserRef = ref();

const ui = shallowRef(LoadingScreen);

EventBus.on("play", () => {
    ui.value = In_game
})

EventBus.on("goToMainMenu", () => {
    ui.value = Main_menu
})

</script>

<template>
    <PhaserGame ref="phaserRef"/>
    <component :is="ui"></component>
</template>

<style lang="postcss">
#app {
    @apply relative h-full w-full bg-black 
}
</style>