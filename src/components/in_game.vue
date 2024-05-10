<script setup lang="ts">
    import {ref} from "vue"
    import {EventBus} from "../game/EventBus"

    const enemiesLeft = ref(0)
    
    EventBus.on("updateEnemyCount", (enemies: number) => {
        enemiesLeft.value = enemies
    })

    EventBus.on("enemyDeath", () => {
        enemiesLeft.value = Math.max(0, enemiesLeft.value - 1)
    })
</script>

<template>
    <div class="absolute bottom-0 text-white p-8">
        <p class="text-3xl">Enemies left: {{enemiesLeft}}</p>
    </div>
</template>