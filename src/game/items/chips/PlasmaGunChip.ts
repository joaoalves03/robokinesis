import {BaseChip} from "@/game/items/chips/BaseChip"
import type {WeaponChip} from "@/game/items/chips/WeaponChip"
import type {BaseWeapon} from "@/game/items/weapons/BaseWeapon"
import type {Player} from "@/game/entities/Player"
import {ChipType} from "@/game/items/chips/ChipType"
import {PlasmaGun} from "@/game/items/weapons/PlasmaGun"

export class PlasmaGunChip extends BaseChip {
    weapon: BaseWeapon

    constructor() {
        super(ChipType.WEAPON, -1, "Plasma Gun", "")
    }

    onEnabled(player: Player): void {
        if(this.weapon) return
        
        this.weapon = new PlasmaGun(player.scene, player.getPlayer())
        
        player.setWeapon(this.weapon)
    }

    onDisabled(player: Player): void {
        player.setWeapon(undefined)
        this.weapon.weapon.destroy()
    }
}