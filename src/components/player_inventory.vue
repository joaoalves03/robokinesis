<script setup lang="ts">
import type {ChipManager} from "@/game/ChipManager"
import {EventBus} from "@/game/EventBus"
import {ref, type Ref} from "vue"
import type {BaseChip} from "@/game/items/chips/BaseChip"
import {ChipType} from "@/game/items/chips/ChipType"

const chips: Ref<BaseChip[]> = ref([])
let chipManager: ChipManager | undefined

const showCardSelect = ref(false)
const cardsToSelect: Ref<BaseChip[]> = ref([])
const selectedCard: Ref<BaseChip | undefined> = ref(undefined)

EventBus.on("startGame", (_chipManager: ChipManager) => {
    chipManager = _chipManager
    cardsToSelect.value = chipManager.getRandomChips(ChipType.WEAPON)
    console.log(cardsToSelect.value)
    showCardSelect.value = true
})

EventBus.on("waveEnded", () => {
    cardsToSelect.value = chipManager!.getRandomChips()
    showCardSelect.value = true
})

EventBus.on("startRound", () => {
    showCardSelect.value = false
})

function selectCard(i: number) {
    if (chipManager!.getActiveChips().length == 3) {
        selectedCard.value = cardsToSelect.value[i]
        return
    } else if (chipManager!.getActiveChips().length == 0
        || chipManager!.getActiveChips().length == 2) {
        EventBus.emit("startRound")
    }

    chipManager!.installChip(cardsToSelect.value[i])
    cardsToSelect.value.splice(i, 1)
    chips.value = chipManager!.getActiveChips()
}

function replaceCard(i: number) {
    if(selectedCard.value == undefined) return
    
    chipManager!.uninstallChip(i)
    chipManager!.installChip(selectedCard.value, i)
    chips.value = chipManager!.getActiveChips()
    selectedCard.value = undefined
    EventBus.emit("startRound")
}
</script>

<template>
    <div v-if="showCardSelect"
         class="absolute top-0 bottom-0 w-full h-full flex flex-row justify-center items-center gap-8"
    >
        <div
            v-for="(item, index) in cardsToSelect"
            @click="selectCard(index)"
            :key="index"
            class="bg-white hover:bg-gray-400 p-8"
            :class="selectedCard == item ? 'border-2 border-yellow-400' : ''">
            {{ item.name }}
        </div>
    </div>

    <div class="absolute bottom-0 flex flex-row gap-8 w-full justify-center"
         :class="selectedCard == undefined ? 'non-interactive' : 'gap-16 pb-8'">
        <div
            v-for="(item, index) in chips"
            :key="index"
            @click="replaceCard(index)"
            class="bg-purple-600 hover:bg-purple-800 p-8 h-32 flex items-center"
            :class="selectedCard == undefined ? '' : 'scale-110'">
            {{ item.name }}
        </div>
    </div>
</template>

<style scoped lang="postcss">

</style>