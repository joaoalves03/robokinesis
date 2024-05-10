import {BaseEnemy} from "../enemies/BaseEnemy"
import Phaser from "phaser"

export class Zombie extends BaseEnemy {
    constructor(world: Phaser.Physics.Matter.World, x: number, y: number) {
        super(world,x,y,"enemies", 40)
    }
}