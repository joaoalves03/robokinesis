<script setup lang="ts">
    import Inventory from "./player_inventory.vue"
    import Player_health from "./player_health.vue"
    import Round_info from "./round_info.vue"
    import {EventBus} from "@/game/EventBus"
    import {onBeforeUnmount, ref} from "vue"
    import Game_over from "@/components/game_over.vue"
    
    const showInfo = ref(false)
    const gameOver = ref(false)

    EventBus.on("startRound", () => {
        showInfo.value = true
    })
    
    EventBus.on("waveEnded", () => {
        showInfo.value = false
    })

    EventBus.on("showGameOverScreen", () => {
        gameOver.value = true
    })
    
    EventBus.on("playAgain", () => {
        gameOver.value = false
        showInfo.value = false
    })
    
    onBeforeUnmount(() => {
        EventBus.removeListener("startRound")
        EventBus.removeListener("waveEnded")
        EventBus.removeListener("showGameOverScreen")
        EventBus.removeListener("playAgain")
    })
</script>

<template>
    <round_info :class="showInfo && !gameOver ? '' : '!hidden'" />
    <player_health :class="showInfo && !gameOver ? '' : '!hidden'" />
    <inventory />
    <game_over :class="gameOver ? '' : '!hidden'" />
</template>