import {BaseEnemy} from "../enemies/BaseEnemy"
import Phaser from "phaser"
import type {Player} from "@/game/entities/Player"

export class Pogo extends BaseEnemy {
    constructor(world: Phaser.Physics.Matter.World, x: number, y: number, player: Player) {
        super(world, x, y, "enemies", 40, player)
        
        this.enemy.anims.create({
            key: 'idleDown',
            frames: this.scene.anims.generateFrameNumbers('pogo', { start: 0, end: 3 }),
            frameRate: 5,
            repeat: -1
        })

        this.enemy.anims.create({
            key: 'idleUp',
            frames: this.scene.anims.generateFrameNumbers('pogo', { start: 4, end: 7 }),
            frameRate: 5,
            repeat: -1
        })

        this.enemy.anims.create({
            key: 'runningDown',
            frames: this.scene.anims.generateFrameNumbers('pogo', { start: 8, end: 11 }),
            frameRate: 10,
            repeat: -1
        })

        this.enemy.anims.create({
            key: 'runningUp',
            frames: this.scene.anims.generateFrameNumbers('pogo', { start: 12, end: 15 }),
            frameRate: 10,
            repeat: -1
        })
    }

    update() {
        super.update()
        
        const {x, y} = this.velocityToPlayer(1)

        this.enemy.setVelocity(x,y)
        this.enemy.setAngularVelocity(0)
        
        const velocity = this.enemy.getVelocity()
        
        this.enemy.setFlipX(velocity.x < 0)
        
        if(velocity.x != 0 && velocity.y != 0) {
            if(velocity.y > 0) {
                this.enemy.play("runningDown", true)
            } else {
                this.enemy.play("runningUp", true)
            }
        } else {
            this.enemy.play("idleDown", true)
        }
    }
}