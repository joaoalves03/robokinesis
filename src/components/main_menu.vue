<script setup lang="ts">
    import {EventBus} from "@/game/EventBus"
    import logo from '/assets/logo.png'
    
    function play(){
        EventBus.emit("play")
    }

    function mapEditor(){
        EventBus.emit("mapEditor")
    }
</script>

<template>
    <div class="absolute top-0 left-0 w-full h-full flex flex-col justify-center items-center gap-8">
        <img :src="logo" alt=""/>
        <div class="flex flex-col justify-center gap-4">
            <div class="button" @click="play">Play</div>
            <div class="button" @click="mapEditor">Map editor</div>
        </div>
    </div>
</template>

<style scoped lang="postcss">
    .button {
        @apply text-center text-white text-3xl py-2 px-8 rounded-xl transition-all border-4 border-[#d95763]
        hover:bg-[#d95763] hover:border-white hover:border-double select-none cursor-pointer;
    }
</style>