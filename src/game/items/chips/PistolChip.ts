import {BaseChip} from "@/game/items/chips/BaseChip"
import type {WeaponChip} from "@/game/items/chips/WeaponChip"
import type {BaseWeapon} from "@/game/items/weapons/BaseWeapon"
import Phaser from "phaser"
import type {Player} from "@/game/entities/Player"
import {Pistol} from "@/game/items/weapons/Pistol"
import {ChipType} from "@/game/items/chips/ChipType"

export class PistolChip extends BaseChip implements WeaponChip {
    weapon: BaseWeapon

    constructor(player: Player) {
        super(ChipType.WEAPON, -1, "Pistol", "", player)
    }
    
    onAcquire(scene: Phaser.Scene, player: Player): void {
        this.weapon = new Pistol(scene, player.getPlayer())
    }

    onExpire(scene: Phaser.Scene, player: Player): void {
    }

    onSelected(scene: Phaser.Scene, player: Player): void | BaseWeapon {
        return this.weapon
    }
    
}