import {BaseChip} from "@/game/items/chips/BaseChip"
import {RocketLauncherChip} from "@/game/items/chips/RocketLauncherChip"
import {ExampleItemChip} from "@/game/items/chips/ExampleItemChip"
import {ExampleEffectChip} from "@/game/items/chips/ExampleEffectChip"
import {PistolChip} from "@/game/items/chips/PistolChip"
import {ExampleItemChip2} from "@/game/items/chips/ExampleItemChip2"
import type {Player} from "@/game/entities/Player"
import {AssaultRifleChip} from "@/game/items/chips/AssaultRifleChip"
import {PlasmaGunChip} from "@/game/items/chips/PlasmaGunChip"
import type {ChipType} from "@/game/items/chips/ChipType"

export class ChipManager {
    private readonly player: Player
    private existing_chips: BaseChip[]
    
    constructor(player: Player) {
        this.player = player
        this.existing_chips = [
            new RocketLauncherChip(this.player),
            new PistolChip(this.player),
            new AssaultRifleChip(this.player),
            new PlasmaGunChip(this.player),
            new ExampleItemChip(this.player),
            new ExampleItemChip2(this.player),
            new ExampleEffectChip(this.player)
        ]
    }
    
    private active_chips: BaseChip[] = []
    
    getActiveChips() {
        return this.active_chips
    }
    
    getRandomChips(filter: ChipType | undefined = undefined) {
        let filteredChips = this.existing_chips.filter(x => !this.active_chips.find(
            y => x === y
        ))

        if(filter != undefined)
            filteredChips = filteredChips.filter(x => x.type == filter)
        
        let currentIndex = filteredChips.length
        while (currentIndex != 0) {
            const randomIndex = Math.floor(Math.random() * currentIndex)
            currentIndex--

            const tmp = filteredChips[randomIndex]
            filteredChips[randomIndex] = filteredChips[currentIndex]
            filteredChips[currentIndex] = tmp
        }
        
        filteredChips = filteredChips.slice(0,3)
        
        return filteredChips
    }
    
    installChip(chip: BaseChip, position: number | undefined = undefined) {
        if (this.active_chips.length < 3) {
            if(position != undefined) {
                this.active_chips.splice(position, 0, chip)
            } else {
                this.active_chips.push(chip)
            }
        }
    }
    
    uninstallChip(index: number) {
        this.active_chips.splice(index, 1)
    }
}