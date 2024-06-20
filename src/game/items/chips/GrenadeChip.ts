import {BaseChip} from "@/game/items/chips/BaseChip"
import {ChipType} from "@/game/items/chips/ChipType"
import type {Player} from "@/game/entities/Player"
import {Grenade} from "@/game/items/weapons/throwables/Grenade"
import grenade from '/assets/chips/grenade.png'

export class GrenadeChip extends BaseChip {
    constructor() {
        super(ChipType.ITEM, 5, "Grenade", grenade)
    }

    onEnabled(player: Player): void {
        const _player = player.getPlayer()

        const target = {
            x: player.scene.input.activePointer.x + player.scene.cameras.main.scrollX,
            y: player.scene.input.activePointer.y + player.scene.cameras.main.scrollY
        }
        
        new Grenade(player.scene, _player.x, _player.y, target.x, target.y)
        
        this.usesLeft--
    }

    onDisabled(player: Player): void {
    }
}