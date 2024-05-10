import Phaser from "phaser"
import type {Player} from "@/game/entities/Player"

export abstract class BaseEnemy extends Phaser.Physics.Matter.Factory {
    private health: number
    private enemy: Phaser.Physics.Matter.Sprite

    protected constructor(world: Phaser.Physics.Matter.World, x: number, y: number, texture: string, health: number) {
        super(world)

        this.enemy = this.scene.matter.add.sprite(x, y, texture, 0)
        this.health = health

        // TODO: Figure out what the type here is
        this.enemy.setOnCollide((pair: any) => {
            if(pair.bodyA.label == "bullet" || pair.bodyB.label == "bullet") {
                // TODO: Replace with bullet damage somehow?
                this.takeDamage(20)
            }
        })
    }

    takeDamage(damage: number) {
        this.health -= damage

        if(this.health <= 0) this.die()
    }

    die() {
        // TODO: Add death effects
        this.enemy.destroy()
        this.scene.events.emit("enemyDeath")
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