<script setup lang="ts">
    import {EventBus} from "@/game/EventBus"

    function play(){
        EventBus.emit("play")
    }
</script>

<template>
    <div class="absolute top-0 left-0 w-full h-full flex flex-col justify-center items-center gap-2">
        <div class="text-white text-7xl font-bold">RoboKinesis</div>
        <div class="flex flex-col justify-center">
            <div class="button" @click="play">Play</div>
        </div>
    </div>
</template>

<style scoped lang="postcss">
    .button {
        @apply text-center text-white text-3xl py-2 px-8 rounded-full transition-all hover:bg-red-500 select-none cursor-pointer;
    }
</style>