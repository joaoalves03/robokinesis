<script setup lang="ts">
    import {EventBus} from "../game/EventBus"

    function selectCard() {
        // TODO: Add to inventory
        EventBus.emit("selectCard")
    }
</script>

<template>
    <div class="absolute top-0 bottom-0 w-full h-full flex flex-row justify-center items-center gap-8">
        <div 
            v-for="i in Array(3).keys()" 
            @click="selectCard"
            class="bg-white hover:bg-gray-400 p-8">
            card {{ i + 1 }}
        </div>
    </div>
</template>