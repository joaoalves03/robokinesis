import {BaseChip} from "@/game/items/chips/BaseChip"
import Phaser from "phaser"
import  {type Player} from "@/game/entities/Player"
import  {type BaseWeapon} from "@/game/items/weapons/BaseWeapon"

export class ExampleEffectChip extends BaseChip {
    constructor() {
        super(ChipType.EFFECT, 3, "Example Effect", "")
    }
    
    onAcquire(scene: Phaser.Scene, player: Player): void {
    }

    onExpire(scene: Phaser.Scene, player: Player): void {
    }

    onSelected(scene: Phaser.Scene, player: Player): void | BaseWeapon {
        return undefined
    }
}