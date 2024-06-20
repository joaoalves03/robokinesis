import Phaser from "phaser"
import type {Player} from "@/game/entities/Player"
import {EventBus} from "@/game/EventBus"

export abstract class BaseEnemy extends Phaser.Physics.Matter.Factory {
    private health: number
    private maxHealth: number
    private healthBar: Phaser.GameObjects.Graphics
    protected enemy: Phaser.Physics.Matter.Sprite
    protected player: Player

    protected constructor(world: Phaser.Physics.Matter.World, x: number, y: number, texture: string, health: number, player: Player) {
        super(world)

        this.enemy = this.scene.matter.add.sprite(x, y, texture, 0)
        this.health = this.maxHealth = health
        this.enemy.setAlpha(0)
        this.enemy.setDepth(5)
        
        // Spawning Effect (white circle)
        const spawnEffect = this.scene.add.circle(this.enemy.x, this.enemy.y, 0, 0xffe600)
        this.scene.add.tween({
            targets: spawnEffect,
            radius: 30,
            duration: 250,
            onComplete: () => {this.enemy.setAlpha(1)}
        })
        this.scene.add.tween({
            targets: spawnEffect,
            fillAlpha: 0,
            duration: 250,
            delay: 250,
            onComplete: () => {spawnEffect.destroy()}
        })

        const onCollideWithPlayer = this.scene.time.addEvent({
            callback: () => {
                player.takeDamage(5)
            },
            delay: 1000,
            startAt: 1000,
            loop: true,
            paused: true
        })
            
        this.enemy.setOnCollide((pair: Phaser.Types.Physics.Matter.MatterCollisionData) => {
            if (pair.bodyA.label == "bullet" || pair.bodyB.label == "bullet") {
                this.takeDamage(20)
            } else if (pair.bodyA.label == "explosion" || pair.bodyB.label == "explosion") {
                this.takeDamage(40)
            } else if (pair.bodyA.label == "pellet" || pair.bodyB.label == "pellet") {
                this.takeDamage(10)
            }
        })

        this.enemy.setOnCollideWith(player.getPlayer().body as MatterJS.Body, () => {
            onCollideWithPlayer.startAt = 2000
            onCollideWithPlayer.paused = false
        })
        
        this.enemy.setOnCollideEnd((pair: Phaser.Types.Physics.Matter.MatterCollisionData) => {
            if (pair.bodyA.label == "player" || pair.bodyB.label == "player") {
                onCollideWithPlayer.paused = true
            }
        })

        this.healthBar = this.scene.add.graphics().setDepth(6)

        this.player = player
    }

    drawHealthBar() {
        this.healthBar.clear()
        this.healthBar.fillStyle(0x000000, 1)
        this.healthBar.fillRect(-25, 0, 50, 8)

        this.healthBar.fillStyle(0x00ff00, 1)
        this.healthBar.fillRect(-25, 0, (this.health / this.maxHealth) * 50, 8)
    }

    takeDamage(damage: number) {
        // If enemy already dead
        if(this.enemy.displayList == null) return
        
        this.health -= damage

        this.drawHealthBar()

        if (this.health <= 0) {
            this.healthBar.destroy()
            this.die()
        }
    }

    die() {
        // TODO: Add death effects
        this.enemy.destroy()
        this.healthBar.clear()
        this.healthBar.destroy()
        EventBus.emit("enemyDeath")
    }

    isDead() {
        return this.health <= 0
    }

    // https://phaser.discourse.group/t/is-it-possible-to-use-sprite-move-to-another-sprite-on-matter-js/2367/2
    velocityToPlayer(speed: number): { x: number, y: number } {
        const from = this.enemy
        const to = this.player.getPlayer()

        const direction = Math.atan((to.x - from.x) / (to.y - from.y));
        const speed2 = to.y >= from.y ? speed : -speed;

        return {x: speed2 * Math.sin(direction), y: speed2 * Math.cos(direction)};
    }

    getGameObject() {
        return this.enemy
    }

    update() {
        if (this.healthBar.alpha != 0) {
            this.healthBar.x = this.enemy.x
            this.healthBar.y = this.enemy.y - 32
        }
    }
}