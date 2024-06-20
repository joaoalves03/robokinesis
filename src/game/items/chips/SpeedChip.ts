import {BaseChip} from "@/game/items/chips/BaseChip"
import Phaser from "phaser"
import  {type Player} from "@/game/entities/Player"
import {ChipType} from "@/game/items/chips/ChipType"
import speed from '/assets/chips/speed.png'

export class SpeedChip extends BaseChip {
    
    constructor() {
        super(ChipType.EFFECT, 3, "Speed boost", speed)
    }

    onEnabled(player: Player): void {
        player.velocityMultiplier(1.5)
        player.scene.time.addEvent({
            delay: 2000,
            callback: () => {
                player.resetVelocity()
            }
        })
        
        this.usesLeft -= 1
    }

    onDisabled(player: Player): void {
    }
}