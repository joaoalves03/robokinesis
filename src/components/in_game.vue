<script setup lang="ts">
    import {ref} from "vue"
    import {EventBus} from "@/game/EventBus"

    const enemiesLeft = ref(0)
    
    EventBus.on("enemyDeath", () => {
    })
</script>

<template>
    <p>Enemies left: {{enemiesLeft}}</p>
</template>

<style scoped>

</style>