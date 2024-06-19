<script setup lang="ts">
import {ref} from "vue"
import {EventBus} from "@/game/EventBus"

const round = ref(0)
const time = ref("00:00")
const killCount = ref(0)

let start = 0
let end = 0

function formatTimeDifference(startTimestamp: number, endTimestamp: number) {
    const difference = Math.abs(endTimestamp - startTimestamp)

    const minutes = Math.floor(difference / 60000)
    const seconds = Math.floor((difference % 60000) / 1000)

    const formattedMinutes = String(minutes).padStart(2, '0')
    const formattedSeconds = String(seconds).padStart(2, '0')

    return `${formattedMinutes}:${formattedSeconds}`
}

EventBus.on("startGame", () => {
    start = Date.now()
    killCount.value = 0
    round.value = 0
})

EventBus.on("newWave", () => {
    round.value += 1
})

EventBus.on("playerDeath", () => {
    end = Date.now()
    time.value = formatTimeDifference(start, end)
})

EventBus.on("enemyDeath", () => {
    killCount.value += 1
})

</script>

<template>
    <div class="absolute top-0 left-0 w-full h-full flex flex-col justify-center items-center gap-2 bg-black bg-opacity-50 text-white">
        <div class="text-7xl font-bold">Game over</div>
        <div class="score-table">
            <div>
                <div>Round</div>
                <div>{{ round }}</div>
            </div>
            <div>
                <div>Time</div>
                <div>{{time}}</div>
            </div>
            <div>
                <div>Kills</div>
                <div>{{killCount}}</div>
            </div>
        </div>
        <div class="flex flex-col justify-center">
            <div class="button">Play again</div>
            <div class="button">Return to menu</div>
        </div>
    </div>
</template>

<style scoped lang="postcss">
    .button {
        @apply text-center text-white text-3xl py-2 px-8 rounded-full transition-all hover:bg-red-500 select-none cursor-pointer;
    }
    
    .score-table {
        @apply flex flex-col w-80 p-4 bg-gray-500 bg-opacity-25 gap-2;
        
        div {
            @apply flex justify-between;
            
            div {
                @apply text-2xl font-semibold;
            }
        }
    }
</style>