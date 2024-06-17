import {BaseChip} from "@/game/items/chips/BaseChip"
import Phaser from "phaser"
import  {type Player} from "@/game/entities/Player"
import  {type BaseWeapon} from "@/game/items/weapons/BaseWeapon"
import {ChipType} from "@/game/items/chips/ChipType"

export class ExampleEffectChip extends BaseChip {
    constructor() {
        super(ChipType.EFFECT, 3, "Example Effect", "")
    }

    onEnabled(player: Player): void {
    }

    onDisabled(player: Player): void {
    }
}