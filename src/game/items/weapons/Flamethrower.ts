import {BaseWeapon} from "@/game/items/weapons/BaseWeapon"

class Flamethrower extends BaseWeapon {
    fire(): void {
        if(this.disabled || this.recharging) return
    }

    altFire(): void {
    }
}