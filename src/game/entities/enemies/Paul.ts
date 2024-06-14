import {BaseEnemy} from "@/game/entities/enemies/BaseEnemy"
import Phaser from "phaser"
import type {Player} from "@/game/entities/Player"
import {EnemyLaser} from "@/game/entities/enemies/projectiles/Laser"
import {EventBus} from "@/game/EventBus"

export class PaulEnemy extends BaseEnemy {
    firingController: Phaser.Time.TimerEvent
    raging = false
    ragingController: Phaser.Time.TimerEvent
    ragingEffect: Phaser.GameObjects.Arc
    ragingEffectTween1: Phaser.Tweens.Tween
    ragingEffectTween2: Phaser.Tweens.Tween

    constructor(world: Phaser.Physics.Matter.World, x: number, y: number, player: Player) {
        super(world, x, y, "enemies", 200, player)

        this.enemy.setOrigin(0.5, 0.5)
        this.ragingEffect = this.scene.add.circle(
            this.enemy.x, this.enemy.y, 0, 0xff0000, 0.5
        )

        this.firingController = this.scene.time.addEvent({
            delay: 1500,
            startAt: 1500,
            loop: true,
            callback: () => {
                const player = this.player.getPlayer()

                for (let i = 0; i < 3; i++) {
                    this.scene.time.delayedCall(
                        i * 100,
                        () => {
                            if(this.enemy)
                                new EnemyLaser(
                                    this.scene,
                                    this.enemy.x + 20 * Math.cos(this.enemy.rotation),
                                    this.enemy.y + 20 * Math.sin(this.enemy.rotation),
                                    player.x,
                                    player.y
                                )
                        }
                    )
                }
            }
        })
        
        this.ragingController = this.scene.time.addEvent({
            delay: 10000,
            callback: () => {
                this.raging = true
                this.firingController.destroy()

                this.ragingEffectTween1 = this.scene.add.tween({
                    targets: this.ragingEffect,
                    radius: 30,
                    ease: 'Power1',
                    duration: 250,
                    repeat: -1,
                    repeatDelay: 250
                })

                this.ragingEffectTween2 = this.scene.add.tween({
                    targets: this.ragingEffect,
                    fillAlpha: 0,
                    ease: 'Power1',
                    duration: 250,
                    onComplete: () => {
                        /*if(this.ragingEffect) {
                            this.ragingEffect.setRadius(0)
                            this.ragingEffect.fillAlpha = 0.5
                        }*/
                    },
                    delay: 250,
                    repeatDelay: 250,
                    repeat: -1
                })
                
                this.firingController = this.scene.time.addEvent({
                    delay: 100,
                    startAt: 100,
                    loop: true,
                    callback: () => {
                        if(this.enemy)
                            new EnemyLaser(
                                this.scene,
                                this.enemy.x + 20 * Math.cos(this.enemy.rotation),
                                this.enemy.y + 20 * Math.sin(this.enemy.rotation),
                                this.enemy.x + 40 * Math.cos(this.enemy.rotation),
                                this.enemy.y + 40 * Math.sin(this.enemy.rotation)
                            )
                    }
                })
            }
        })
    }

    update() {
        super.update()
        
        if (this.raging) {
            this.enemy.rotation += 0.005 * this.scene.sys.game.loop.delta
            
            // I love null checks
            if(this.ragingEffect) {
                this.ragingEffect.setPosition(this.enemy.x, this.enemy.y)
            }
        } else
            this.enemy.setRotation(
                Phaser.Math.Angle.Between(this.enemy.x, this.enemy.y, this.player.getPlayer().x, this.player.getPlayer().y)
            )
    }
    
    die() {
        this.firingController.destroy()
        this.ragingController.destroy()
        if (this.raging) {
            this.ragingEffectTween1.destroy()
            this.ragingEffectTween2.destroy()
        }
        if(this.ragingEffect) this.ragingEffect.destroy()
        this.enemy.destroy()
        EventBus.emit("enemyDeath")
    }
}