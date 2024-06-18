<script setup lang="ts">
import {EventBus} from "@/game/EventBus"
import {ref} from "vue"

const playerHealth = ref(100)

EventBus.on("updateHP", (n: number) => {
    playerHealth.value = n
})
</script>

<template>
    <div class="non-interactive content">
        <div :style="`width: ${playerHealth}%;`"></div>
        <img src="/assets/heart.svg" alt="">
        <p>{{ playerHealth }}</p>
    </div>
</template>

<style scoped lang="postcss">
.content {
    @apply absolute bottom-0 left-0 text-white m-8 w-96 bg-black bg-opacity-50 rounded-xl overflow-hidden flex items-center gap-2;

    div {
        @apply bg-red-600 h-full absolute top-0 rounded-xl transition-all duration-150 ease-in-out;
    }

    img {
        @apply relative w-8 ml-2
    }

    p {
        @apply relative text-2xl py-2;
    }
}
</style>