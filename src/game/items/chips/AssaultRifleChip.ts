import {BaseChip} from "@/game/items/chips/BaseChip"
import type {Player} from "@/game/entities/Player"
import {ChipType} from "@/game/items/chips/ChipType"
import {AssaultRifle} from "@/game/items/weapons/AssaultRifle"
import type {BaseWeapon} from "@/game/items/weapons/BaseWeapon"
import rifle from '/assets/chips/rifle.png'

export class AssaultRifleChip extends BaseChip {
    weapon: BaseWeapon
    
    constructor() {
        super(ChipType.WEAPON, -1, "Assault Rifle", rifle)
    }

    onEnabled(player: Player): void {
        if(!this.weapon)
            this.weapon = new AssaultRifle(player.scene, player.getPlayer())
        
        this.weapon.enable()
        player.setWeapon(this.weapon)
    }

    onDisabled(player: Player): void {
        this.weapon.disable()
        player.setWeapon(undefined)
    }
}