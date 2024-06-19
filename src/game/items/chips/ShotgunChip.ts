import {BaseChip} from "@/game/items/chips/BaseChip"
import type {BaseWeapon} from "@/game/items/weapons/BaseWeapon"
import {ChipType} from "@/game/items/chips/ChipType"
import {Player} from "@/game/entities/Player"
import {Shotgun} from "@/game/items/weapons/Shotgun"

export class ShotgunChip extends BaseChip {
    weapon: BaseWeapon

    constructor() {
        super(ChipType.WEAPON, -1, "Shotgun", "/assets/chips/shotgun.png")
    }

    onEnabled(player: Player): void {
        if(this.weapon) return

        this.weapon = new Shotgun(player.scene, player.getPlayer())

        player.setWeapon(this.weapon)
    }

    onDisabled(player: Player): void {
        player.setWeapon(undefined)
        this.weapon.weapon.destroy()
    }
}