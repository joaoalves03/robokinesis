<script setup lang="ts">
import {EventBus} from "@/game/EventBus"

function exit() {
    EventBus.emit("saveMap", false)
}

function save() {
    EventBus.emit("saveMap", true)
}
</script>

<template>
    <div class="absolute bottom-2 left-2 flex flex-col justify-center items-center gap-2 select-none">
        <div class="button" @click="exit">Exit</div>
    </div>
    
    <div class="absolute bottom-2 right-2 flex flex-col justify-center items-center gap-2 select-none">
        <div class="button" @click="save">Save</div>
    </div>
</template>

<style scoped lang="postcss">
.button {
    @apply text-center text-white text-3xl py-2 px-8 rounded-full transition-all hover:bg-red-500 select-none cursor-pointer;
}
</style>