import {BaseEnemy} from "@/game/entities/enemies/BaseEnemy"
import Phaser from "phaser"
import type {Player} from "@/game/entities/Player"
import {EventBus} from "@/game/EventBus"
import {EnemyCannonball} from "@/game/entities/enemies/projectiles/Cannonball"
import Vector2 = Phaser.Math.Vector2

export class FredEnemy extends BaseEnemy {
    firingController: Phaser.Tweens.TweenChain
    
    constructor(world: Phaser.Physics.Matter.World, x: number, y: number, player: Player) {
        super(world, x, y, "enemies", 100, player)

        this.enemy.setOrigin(0.5, 0.5)
        this.enemy.setFrictionAir(0.04)

        this.firingController = this.scene.tweens.chain({
            targets: this.enemy,
            loop: -1,
            loopDelay: 2250,
            delay: 2500,
            tweens: [
                {
                    scale: 2,
                    duration: 2500,
                    ease: 'Linear',
                    onComplete: () => {
                        const player = this.player.getPlayer()

                        new EnemyCannonball(
                            this.scene,
                            this.enemy.x + 20 * Math.cos(this.enemy.rotation),
                            this.enemy.y + 20 * Math.sin(this.enemy.rotation),
                            player.x,
                            player.y
                        )

                        this.enemy.applyForce(new Vector2(
                            0.004 * -Math.cos(this.enemy.rotation),
                            0.004 * -Math.sin(this.enemy.rotation)
                        ))
                    }
                },
                {
                    scale: 1,
                    duration: 250,
                    ease: 'Sine.easeInOut'
                }
            ]
        })
    }

    update() {
        super.update()

        this.enemy.setRotation(
            Phaser.Math.Angle.Between(this.enemy.x, this.enemy.y, this.player.getPlayer().x, this.player.getPlayer().y)
        )
    }
    
    die() {
        this.firingController.stop()
        this.firingController.destroy()
        this.enemy.destroy()
        EventBus.emit("enemyDeath")
    }
}