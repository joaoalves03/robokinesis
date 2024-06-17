import {BaseChip} from "@/game/items/chips/BaseChip"
import type {Player} from "@/game/entities/Player"
import {Pistol} from "@/game/items/weapons/Pistol"
import {ChipType} from "@/game/items/chips/ChipType"
import type {BaseWeapon} from "@/game/items/weapons/BaseWeapon"

export class PistolChip extends BaseChip {
    weapon: BaseWeapon
    
    constructor() {
        super(ChipType.WEAPON, -1, "Pistol", "")
    }

    onEnabled(player: Player): void {
        if(!this.weapon)
        if(!this.weapon)
            this.weapon = new Pistol(player.scene, player.getPlayer())
        
        this.weapon.enable()
        player.setWeapon(this.weapon)
    }

    onDisabled(player: Player): void {
        this.weapon.disable()
        player.setWeapon(undefined)
    }
}