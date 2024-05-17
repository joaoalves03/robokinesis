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
    <div class="non-interactive absolute top-0 text-white w-full flex flex-col items-center">
        <p class="text-3xl">Round {{wave}}</p>
        <p class="text-xl">Enemies left: {{enemiesLeft}}</p>
    </div>
</template>

<style scoped lang="postcss">

</style>