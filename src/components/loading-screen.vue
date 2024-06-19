<script setup lang="ts">
import {EventBus} from "@/game/EventBus"
import {ref} from "vue"

const loadingProgress = ref(0)

EventBus.on("loadProgress", (n: number) => {
    loadingProgress.value = n*100
})
</script>

<template>
    <div class="absolute top-0 left-0 w-full h-full flex flex-col justify-center items-center gap-2 text-white">
        <div class="text-white text-7xl font-bold">Loading</div>
        <div class="text-4xl">{{ loadingProgress.toFixed(0) }} %</div>
    </div>
</template>

<style scoped lang="postcss">

</style>