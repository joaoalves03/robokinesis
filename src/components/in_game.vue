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
    <template v-if="showInfo">
        <round_info />
        <player_health />
    </template>
    <inventory />
</template>