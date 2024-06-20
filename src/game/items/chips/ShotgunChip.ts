import {BaseChip} from "@/game/items/chips/BaseChip"
import type {BaseWeapon} from "@/game/items/weapons/BaseWeapon"
import {ChipType} from "@/game/items/chips/ChipType"
import {Player} from "@/game/entities/Player"
import {Shotgun} from "@/game/items/weapons/Shotgun"
import shotgun from '/assets/chips/shotgun.png'

export class ShotgunChip extends BaseChip {
    weapon: BaseWeapon

    constructor() {
        super(ChipType.WEAPON, -1, "Shotgun", shotgun)
    }

    onEnabled(player: Player): void {
        if(!this.weapon)
            this.weapon = new Shotgun(player.scene, player.getPlayer())

        this.weapon.enable()
        player.setWeapon(this.weapon)
    }

    onDisabled(player: Player): void {
        this.weapon.disable()
        player.setWeapon(undefined)
    }
}