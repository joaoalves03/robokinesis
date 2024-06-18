<script setup lang="ts">
    import Inventory from "./player_inventory.vue"
    import Player_health from "./player_health.vue"
    import Round_info from "./round_info.vue"
    import {EventBus} from "@/game/EventBus"
    import {ref} from "vue"
    
    const showInfo = ref(false)

    EventBus.on("startRound", () => {
        showInfo.value = true
    })
    
    EventBus.on("waveEnded", () => {
        showInfo.value = false
    })
</script>

<template>
    <round_info :class="showInfo ? '' : '!hidden'" />
    <player_health :class="showInfo ? '' : '!hidden'" />
    <inventory />
</template>