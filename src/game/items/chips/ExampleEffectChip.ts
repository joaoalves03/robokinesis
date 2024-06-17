import {BaseChip} from "@/game/items/chips/BaseChip"
import Phaser from "phaser"
import  {type Player} from "@/game/entities/Player"
import  {type BaseWeapon} from "@/game/items/weapons/BaseWeapon"
import {ChipType} from "@/game/items/chips/ChipType"

export class ExampleEffectChip extends BaseChip {
    constructor(player: Player) {
        super(ChipType.EFFECT, 3, "Example Effect", "", player)
    }
    
    onAcquire(scene: Phaser.Scene, player: Player): void {
    }

    onExpire(scene: Phaser.Scene, player: Player): void {
    }

    onSelected(scene: Phaser.Scene, player: Player): void | BaseWeapon {
        return undefined
    }
}