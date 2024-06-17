import type {BaseWeapon} from "@/game/items/weapons/BaseWeapon"
import type {Player} from "@/game/entities/Player"

export abstract class BaseChip {
    type: ChipType
    usesLeft: number // -1: Chip does not expire (ex.: Weapon)
    name: string
    image: string // URL to sprite
    player: Player

    constructor(type: ChipType, usesLeft: number, name: string, image: string, player: Player) {
        this.type = type
        this.usesLeft = usesLeft
        this.name = name
        this.image = image
        this.player = player
    }

    use(): void {
        if (this.usesLeft <= 0) {
            //this.onExpire()
            return
        }
        this.usesLeft--
    }

    // Is executed when the player selects this card
    // Ex.: Adds the weapon to the inventory
    abstract onAcquire(scene: Phaser.Scene, player: Player): void

    // The opposite of onAcquire()
    // Is executed when the card expires or is replaced by another one
    abstract onExpire(scene: Phaser.Scene, player: Player): void
    
    // Is executed when it's respective slot is selected
    // Ex.: Pressing 1 on keyboard makes the weapon active
    abstract onSelected(scene: Phaser.Scene, player: Player): void | BaseWeapon
}
    