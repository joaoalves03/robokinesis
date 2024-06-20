import {BaseChip} from "@/game/items/chips/BaseChip"
import type {BaseWeapon} from "@/game/items/weapons/BaseWeapon"
import type {Player} from "@/game/entities/Player"
import {ChipType} from "@/game/items/chips/ChipType"
import {PlasmaGun} from "@/game/items/weapons/PlasmaGun"
import plasma from '/assets/chips/plasma.png'

export class PlasmaGunChip extends BaseChip {
    weapon: BaseWeapon

    constructor() {
        super(ChipType.WEAPON, -1, "Plasma Gun", plasma)
    }

    onEnabled(player: Player): void {
        if(!this.weapon) 
            this.weapon = new PlasmaGun(player.scene, player.getPlayer())

        this.weapon.enable()
        player.setWeapon(this.weapon)
    }

    onDisabled(player: Player): void {
        this.weapon.disable()
        player.setWeapon(undefined)
    }
}