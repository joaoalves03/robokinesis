import {BaseChip} from "@/game/items/chips/BaseChip"
import {RocketLauncherChip} from "@/game/items/chips/RocketLauncherChip"
import {PistolChip} from "@/game/items/chips/PistolChip"
import type {Player} from "@/game/entities/Player"
import {AssaultRifleChip} from "@/game/items/chips/AssaultRifleChip"
import {PlasmaGunChip} from "@/game/items/chips/PlasmaGunChip"
import type {ChipType} from "@/game/items/chips/ChipType"
import {ShotgunChip} from "@/game/items/chips/ShotgunChip"
import {GrenadeChip} from "@/game/items/chips/GrenadeChip"
import {EventBus} from "@/game/EventBus"
import {SpeedChip} from "@/game/items/chips/SpeedChip";

export class ChipManager {
    private readonly player: Player
    private existing_chips: BaseChip[]
    private active_chips: BaseChip[] = []
    private selected_chip?: number
    
    constructor(player: Player) {
        this.player = player
        this.existing_chips = [
            new RocketLauncherChip(),
            new PistolChip(),
            new AssaultRifleChip(),
            new PlasmaGunChip(),
            new ShotgunChip(),
            new SpeedChip(),
            new GrenadeChip()
        ]
    }
    
    getActiveChips() {
        return this.active_chips
    }
    
    getRandomChips(filter: ChipType | undefined = undefined) {
        let filteredChips = this.existing_chips.filter(x => !this.active_chips.find(
            y => x.name === y.name
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
    
    enableChip(index: number) {
        if(index == this.selected_chip) {
            this.active_chips[this.selected_chip].onDisabled(this.player)
            this.selected_chip = undefined
            EventBus.emit("selectChip", -1)
        } else if (this.selected_chip == undefined) {
            if(index < this.active_chips.length) {
                this.active_chips[index].onEnabled(this.player)
                this.selected_chip = index
                EventBus.emit("selectChip", index)
            }
        } else if (this.active_chips[index] == undefined) {
            EventBus.emit("selectChip", this.selected_chip)
        } else {
            this.active_chips[this.selected_chip].onDisabled(this.player)
            this.active_chips[index].onEnabled(this.player)
            this.selected_chip = index
            EventBus.emit("selectChip", index)
        }
    }
}