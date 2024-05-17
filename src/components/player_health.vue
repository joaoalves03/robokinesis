<script setup lang="ts">
    import {EventBus} from "../game/EventBus"
    import {ref} from "vue"

    const playerHealth = ref(100)
    
    EventBus.on("damageTaken", (damage: number) => {
        playerHealth.value = Math.max(0, playerHealth.value - damage)
    })
</script>

<template>
    <div class="non-interactive absolute bottom-0 left-0 text-white p-8">
        <p class="text-5xl">{{playerHealth}} HP</p>
    </div>
</template>

<style scoped lang="postcss">

</style>