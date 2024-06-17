import type {BaseWeapon} from "@/game/items/weapons/BaseWeapon"
import type {Player} from "@/game/entities/Player"
import type {ChipType} from "@/game/items/chips/ChipType"

export abstract class BaseChip {
    type: ChipType
    usesLeft: number // -1: Chip does not expire (ex.: Weapon)
    name: string
    image: string // URL to sprite

    constructor(type: ChipType, usesLeft: number, name: string, image: string) {
        this.type = type
        this.usesLeft = usesLeft
        this.name = name
        this.image = image
    }

    use(): void {
        if (this.usesLeft <= 0) {
            //this.onExpire()
            return
        }
        this.usesLeft--
    }
    
    // Is executed when it's respective slot is selected
    // Ex.: Pressing 1 on keyboard makes the weapon active
    abstract onEnabled(player: Player): void
    
    abstract onDisabled(player: Player): void
}
    