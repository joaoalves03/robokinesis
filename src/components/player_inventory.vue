<script setup lang="ts">
import type {ChipManager} from "@/game/ChipManager"
import {EventBus} from "@/game/EventBus"
import {onBeforeUnmount, ref, type Ref} from "vue"
import type {BaseChip} from "@/game/items/chips/BaseChip"
import {ChipType} from "@/game/items/chips/ChipType"
import green from '/assets/chips/chip-green.png'
import purple from '/assets/chips/chip-purple.png'
import red from '/assets/chips/chip-red.png'

const chips: Ref<BaseChip[]> = ref([])
let chipManager: ChipManager | undefined

const showCardSelect = ref(false)
const cardsToSelect: Ref<BaseChip[]> = ref([])
const selectedCard: Ref<BaseChip | undefined> = ref(undefined)
const chip: Ref<number | undefined> = ref(0)

const hide = ref(false)

const startGame = (_chipManager: ChipManager) => {
    chipManager = _chipManager
    cardsToSelect.value = chipManager.getRandomChips(ChipType.WEAPON)
    showCardSelect.value = true
    hide.value = false
}

const waveEnded = () => {
    chipManager?.enableChip(undefined)
    cardsToSelect.value = chipManager!.getRandomChips()
    showCardSelect.value = true
}

const startRound = () => {
    showCardSelect.value = false
}

const playAgain = () => {
    chips.value = []
}

const showGameOverScreen = () => {
    hide.value = true
}

const selectChip = (n: number) => {
    chip.value = undefined
    chip.value = n
}

EventBus.on("startGame", startGame)
EventBus.on("waveEnded", waveEnded)
EventBus.on("startRound", startRound)
EventBus.on("playAgain", playAgain)
EventBus.on("showGameOverScreen", showGameOverScreen)
EventBus.on("selectChip", selectChip)

onBeforeUnmount(() => {
    EventBus.removeListener("startGame", startGame)
    EventBus.removeListener("waveEnded", waveEnded)
    EventBus.removeListener("startRound", startRound)
    EventBus.removeListener("playAgain", playAgain)
    EventBus.removeListener("showGameOverScreen", showGameOverScreen)
})

function selectCard(i: number) {
    if (chipManager!.getActiveChips().length == 3) {
        selectedCard.value = cardsToSelect.value[i]
        return
    }

    chipManager!.installChip(cardsToSelect.value[i])
    cardsToSelect.value.splice(i, 1)
    chips.value = chipManager!.getActiveChips()
    EventBus.emit("startRound")
    EventBus.emit("game_startRound")
}

function replaceCard(i: number) {
    if(selectedCard.value == undefined) return
    
    chipManager!.uninstallChip(i)
    chipManager!.installChip(selectedCard.value, i)
    chips.value = chipManager!.getActiveChips()
    selectedCard.value = undefined
    EventBus.emit("startRound")
    EventBus.emit("game_startRound")
}

function skip() {
    EventBus.emit("startRound")
    EventBus.emit("game_startRound")
}
</script>

<template>
    <div v-if="showCardSelect"
         class="absolute top-0 bottom-0 w-full h-full flex flex-col justify-center items-center gap-8 select-none scale-50 lg:scale-75 xl:scale-100"
    >
        <div class="flex flex-row justify-center items-center gap-8">
            <div
                v-for="(item, index) in cardsToSelect"
                @click="selectCard(index)"
                :key="index"
                class="relative transition-all duration-150 ease-in-out"
                :class="selectedCard == undefined ? 'scale-125 m-2' : selectedCard == item ? 'scale-150' : 'scale-95 brightness-50'">
                <img :src="item.type == 0 ? green : item.type == 1 ? purple : red" class="relative z-10" alt="">
                <img :src="item.image" alt="" class="absolute top-[0.8rem] right-[0.8rem] z-0" />
                <div class="absolute w-[6.8rem] bottom-12 left-4 pl-1 z-20 overflow-hidden whitespace-nowrap">
                    <p class="text-sm text-white "
                       :class="item.name.length > 8 ? 'animate-ping-pong-scroll' : ''"
                    >{{ item.name }}</p>
                </div>
            </div>
        </div>
        <div v-if="chipManager!.getActiveChips().length == 3"
             @click="skip()"
             class="bg-white rounded-xl py-2 px-4 hover:bg-gray-400">
            Skip
        </div>
    </div>

    <div class="absolute flex w-full justify-center -bottom-8 lg:-bottom-2 xl:bottom-4 scale-50 lg:scale-75 xl:scale-100 select-none"
         :class="[(selectedCard == undefined ? 'non-interactive' : ''),(hide ? '!hidden' : '')]">

        <img class="bottom-6 absolute z-0 select-none" src="/assets/chips/chip-container-top.png" alt=""/>

        <div class="relative grid grid-cols-3 gap-3 z-10 select-none">
            <div
                v-for="(item, index) in chips"
                :key="index"
                @click="replaceCard(index)"
                class="relative -bottom-3 transition-all duration-150 ease-in-out"
                :class="selectedCard == undefined ? '' : 'hover:bottom-0'">
                <img :src="item.type == 0 ? green : item.type == 1 ? purple : red" class="relative z-10" alt="">
                <img :src="item.image" alt="" class="absolute top-[0.8rem] right-[0.8rem] z-0" />
                <div class="absolute w-24 bottom-12 left-5 z-20 overflow-hidden whitespace-nowrap">
                    <p class="text-sm text-white "
                       :class="item.name.length > 8 ? 'hover:animate-ping-pong-scroll' : ''"
                    >{{ item.name }}</p>
                </div>
            </div>
        </div>

        <img class="-bottom-24 absolute z-20 select-none" src="/assets/chips/chip-container-bottom.png" alt=""/>

        <div class="absolute grid grid-cols-3 z-30 place-items-center -bottom-1 w-[480px] select-none">
            <img src="/assets/chips/button-1.png" :class="chip == 0 ? 'bg-yellow-300' : ''" alt=""/>
            <img src="/assets/chips/button-2.png" :class="chip == 1 ? 'bg-yellow-300' : ''" alt=""/>
            <img src="/assets/chips/button-3.png" :class="chip == 2 ? 'bg-yellow-300' : ''" alt=""/>
        </div>
    </div>
</template>

<style scoped lang="postcss">

</style>