<script setup lang="ts">
    import Card_select from "../components/card_select.vue"
    import Inventory from "./player_inventory.vue"
    import Player_health from "./player_health.vue"
    import Round_info from "./round_info.vue"
</script>

<template>
    <card_select />
    <round_info />
    <player_health />
    <inventory />
</template>