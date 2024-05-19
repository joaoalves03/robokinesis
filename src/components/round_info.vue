<script setup lang="ts">
    import {ref} from "vue"
    import {EventBus} from "../game/EventBus"
    
    const enemiesLeft = ref(0)
    const wave = ref(0)
    
    EventBus.on("updateEnemyCount", (enemies: number) => {
        enemiesLeft.value = enemies
    })
    
    EventBus.on("enemyDeath", () => {
        enemiesLeft.value = Math.max(0, enemiesLeft.value - 1)
    })

    EventBus.on("newWave", () => {
        wave.value += 1
    })
</script>

<template>
    <div class="content non-interactive">
        <div>
            <p class="text-2xl font-bold">Round {{wave}}</p>
            <div>
                <p class="text-lg">Enemies left</p>
                <p class="text-4xl font-bold">{{enemiesLeft}}</p>
            </div>
        </div>
    </div>
</template>

<style scoped lang="postcss">
    .content {
        @apply absolute top-8 w-full flex flex-col items-center;
        
        > div {
            @apply text-white inline-flex flex-col items-center bg-black bg-opacity-50 p-4 rounded-xl;
            
            > div {
                @apply flex flex-col items-center
            }
        }
    }
</style>