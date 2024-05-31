import Phaser from "phaser"
import type {Player} from "@/game/entities/Player"
import {EventBus} from "@/game/EventBus"

export abstract class BaseEnemy extends Phaser.Physics.Matter.Factory {
    private health: number
    private enemy: Phaser.Physics.Matter.Sprite

    protected constructor(world: Phaser.Physics.Matter.World, x: number, y: number, texture: string, health: number) {
        super(world)

        this.enemy = this.scene.matter.add.sprite(x, y, texture, 0)
        this.health = health
        
        const onCollideWithPlayer = this.scene.time.addEvent({
            callback: () => {EventBus.emit("damagePlayer", 10)},
            delay: 1000,
            startAt: 1000,
            loop: true,
            paused: true
        })

        // TODO: Figure out what the type here is
        this.enemy.setOnCollide((pair: any) => {
            if(pair.bodyA.label == "bullet" || pair.bodyB.label == "bullet") {
                // TODO: Replace with bullet damage somehow?
                this.takeDamage(20)
            }else if (pair.bodyA.label == "explosion" || pair.bodyB.label == "explosion") {
                this.takeDamage(40)
            } else if(pair.bodyA.label == "player" || pair.bodyB.label == "player") {
                onCollideWithPlayer.startAt = 2000
                onCollideWithPlayer.paused = false
            }
        })

        this.enemy.setOnCollideEnd((pair: any) => {
            if(pair.bodyA.label == "player" || pair.bodyB.label == "player") {
                onCollideWithPlayer.paused = true
            }
        })
        
        //this.enemy.setcol
    }

    takeDamage(damage: number) {
        this.health -= damage

        if(this.health <= 0) this.die()
    }

    die() {
        // TODO: Add death effects
        this.enemy.destroy()
        EventBus.emit("enemyDeath")
    }

    isDead() {
        return this.health <= 0
    }

    trackPlayer(player: Player) {

    }

    getGameObject() {
        return this.enemy
    }
}