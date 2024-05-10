<script setup lang="ts">
import {ref, shallowRef} from 'vue';
import PhaserGame from './game/PhaserGame.vue';
import In_game from "./components/in_game.vue"

const phaserRef = ref();

const ui = shallowRef(In_game);

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