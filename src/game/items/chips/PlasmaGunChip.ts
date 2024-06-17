import {BaseChip} from "@/game/items/chips/BaseChip"
import type {WeaponChip} from "@/game/items/chips/WeaponChip"
import type {BaseWeapon} from "@/game/items/weapons/BaseWeapon"
import type {Player} from "@/game/entities/Player"
import {ChipType} from "@/game/items/chips/ChipType"
import {PlasmaGun} from "@/game/items/weapons/PlasmaGun"

export class PlasmaGunChip extends BaseChip implements WeaponChip {
    weapon: BaseWeapon

    constructor(player: Player) {
        super(ChipType.WEAPON, -1, "Plasma Gun", "", player)
    }

    onAcquire(scene: Phaser.Scene, player: Player): void {
        this.weapon = new PlasmaGun(scene, player.getPlayer())
    }

    onExpire(scene: Phaser.Scene, player: Player): void {
    }

    onSelected(scene: Phaser.Scene, player: Player): void | BaseWeapon {
        return this.weapon
    }
}