import {BaseChip} from "@/game/items/chips/BaseChip"
import  {type BaseWeapon} from "@/game/items/weapons/BaseWeapon"
import type {WeaponChip} from "@/game/items/chips/WeaponChip"
import {RocketLauncher} from "@/game/items/weapons/RocketLauncher"
import type {Player} from "@/game/entities/Player"

export class RocketLauncherChip extends BaseChip implements WeaponChip {
    weapon: BaseWeapon

    constructor() {
        super(ChipType.WEAPON, -1, "Rocket Launcher", "")
    }
    
    onAcquire(scene: Phaser.Scene, player: Player): void {
        this.weapon = new RocketLauncher(scene, player.getPlayer())
    }

    onExpire(scene: Phaser.Scene, player: Player): void {
    }

    onSelected(scene: Phaser.Scene, player: Player): void | BaseWeapon {
        return this.weapon
    }

}