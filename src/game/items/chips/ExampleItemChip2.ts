import {BaseChip} from "@/game/items/chips/BaseChip"
import Phaser from "phaser"
import type {Player} from "@/game/entities/Player"
import type {BaseWeapon} from "@/game/items/weapons/BaseWeapon"
import {ChipType} from "@/game/items/chips/ChipType"

export class ExampleItemChip2 extends BaseChip {
    constructor() {
        super(ChipType.ITEM, 5, "Example Item 2", "")
    }

    onEnabled(player: Player): void {
    }

    onDisabled(player: Player): void {
    }
}