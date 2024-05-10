<script setup lang="ts">
    import {ref} from "vue"
    import {EventBus} from "../game/EventBus"
    import Card_select from "../components/card_select.vue"

    const enemiesLeft = ref(0)
    const cardSelect = ref(false)
    
    EventBus.on("updateEnemyCount", (enemies: number) => {
        enemiesLeft.value = enemies
    })

    EventBus.on("enemyDeath", () => {
        enemiesLeft.value = Math.max(0, enemiesLeft.value - 1)
    })
    
    EventBus.on("waveEnded", () => {
        cardSelect.value = true
    })
    
    EventBus.on("selectCard", () => {
        cardSelect.value = false
    })
</script>

<template>
    <card_select v-if="cardSelect" />
    <div class="non-interactive absolute bottom-0 text-white p-8">
        <p class="text-3xl">Enemies left: {{enemiesLeft}}</p>
    </div>
</template>