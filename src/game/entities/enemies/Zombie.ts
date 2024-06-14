import {BaseEnemy} from "../enemies/BaseEnemy"
import Phaser from "phaser"
import type {Player} from "@/game/entities/Player"

export class Zombie extends BaseEnemy {
    constructor(world: Phaser.Physics.Matter.World, x: number, y: number, player: Player) {
        super(world, x, y, "enemies", 40, player)
    }

    update() {
        super.update()
        
        const {x, y} = this.velocityToPlayer(1)

        this.enemy.setVelocity(x,y)
    }
}