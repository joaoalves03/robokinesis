<script setup lang="ts">
    import {EventBus} from "../game/EventBus"
    import {ref} from "vue"

    const playerHealth = ref(100)
    
    EventBus.on("damagePlayer", (damage: number) => {
        playerHealth.value = Math.max(0, playerHealth.value - damage)
    })
</script>

<template>
    <div class="non-interactive container">
        <div :style="`width: ${playerHealth}%;`"></div>
        <p class="">{{playerHealth}}</p>
    </div>
</template>

<style scoped lang="postcss">
    .container {
        @apply absolute bottom-0 left-0 text-white m-8 w-96 bg-black bg-opacity-50 rounded-xl overflow-hidden flex items-center;
        
        div {
            @apply bg-red-600 h-full absolute top-0 rounded-xl transition-all duration-150 ease-in-out;
        }
        
        p {
            @apply relative text-2xl pl-4 py-2;
        }
    }
</style>