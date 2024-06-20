<script setup lang="ts">
import {onBeforeUnmount, ref} from "vue"
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

function startGame() {
    start = Date.now()
    killCount.value = 0
    round.value = 0
}

function newWave() {
    round.value += 1
}

function playerDeath() {
    end = Date.now()
    time.value = formatTimeDifference(start, end)
}

function enemyDeath() {
    killCount.value += 1
}

EventBus.on("startGame", startGame)
EventBus.on("newWave", newWave)
EventBus.on("playerDeath", playerDeath)
EventBus.on("enemyDeath", enemyDeath)

function playAgain() {
    EventBus.emit("playAgain")
    EventBus.emit("game_playAgain")
}

function goToMainMenu() {
    EventBus.emit("goToMainMenu")
    EventBus.emit("game_goToMainMenu")
}

onBeforeUnmount(() => {
    EventBus.removeListener("startGame", startGame)
    EventBus.removeListener("newWave", newWave)
    EventBus.removeListener("playerDeath", playerDeath)
    EventBus.removeListener("enemyDeath", enemyDeath)
})

</script>

<template>
    <div class="absolute top-0 left-0 w-full h-full flex flex-col justify-center items-center gap-8 text-white">
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
        <div class="flex flex-col justify-center gap-2">
            <div class="button" @click="playAgain">Play again</div>
            <div class="button" @click="goToMainMenu">Return to menu</div>
        </div>
    </div>
</template>

<style scoped lang="postcss">
    .button {
        @apply text-center text-white text-3xl py-2 px-8 rounded-xl transition-all border-4 border-[#d95763]
        hover:bg-[#d95763] hover:border-white hover:border-double select-none cursor-pointer;
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