import {BaseChip} from "@/game/items/chips/BaseChip"
import {RocketLauncher} from "@/game/items/weapons/RocketLauncher"
import {ChipType} from "@/game/items/chips/ChipType"
import {Player} from "@/game/entities/Player"
import type {BaseWeapon} from "@/game/items/weapons/BaseWeapon"
import rocket from '/assets/chips/rocket.png'

export class RocketLauncherChip extends BaseChip {
    weapon: BaseWeapon
    
    constructor() {
        super(ChipType.WEAPON, -1, "Rocket Launcher", rocket)
    }

    onEnabled(player: Player): void {
        if(!this.weapon)
            this.weapon = new RocketLauncher(player.scene, player.getPlayer())

        this.weapon.enable()
        player.setWeapon(this.weapon)
    }

    onDisabled(player: Player): void {
        this.weapon.disable()
        player.setWeapon(undefined)
    }
}