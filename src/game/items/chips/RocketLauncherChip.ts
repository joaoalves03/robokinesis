import {BaseChip} from "@/game/items/chips/BaseChip"
import {RocketLauncher} from "@/game/items/weapons/RocketLauncher"
import {ChipType} from "@/game/items/chips/ChipType"
import {Player} from "@/game/entities/Player"
import type {BaseWeapon} from "@/game/items/weapons/BaseWeapon"

export class RocketLauncherChip extends BaseChip {
    weapon: BaseWeapon
    
    constructor() {
        super(ChipType.WEAPON, -1, "Rocket Launcher", "")
    }

    onEnabled(player: Player): void {
        if(this.weapon) return

        this.weapon = new RocketLauncher(player.scene, player.getPlayer())

        player.setWeapon(this.weapon)
    }

    onDisabled(player: Player): void {
        player.setWeapon(undefined)
        this.weapon.weapon.destroy()
    }
}