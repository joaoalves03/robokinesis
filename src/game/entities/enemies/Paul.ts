import {BaseEnemy} from "@/game/entities/enemies/BaseEnemy"
import Phaser from "phaser"
import type {Player} from "@/game/entities/Player"
import {Bullet} from "@/game/items/weapons/projectiles/Bullet"
import {EnemyLaser} from "@/game/entities/enemies/projectiles/Laser"
import {EventBus} from "@/game/EventBus"

export class PaulEnemy extends BaseEnemy {
    firingController: Phaser.Time.TimerEvent
    raging = false
    ragingController: Phaser.Time.TimerEvent
    ragingEffect: Phaser.GameObjects.Arc
    ragingEffectController: Phaser.Time.Timeline

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
                            if(this.enemy == null) return
                            
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

                this.ragingEffectController = this.scene.add.timeline([
                    {
                        at: 250,
                        tween: {
                            targets: this.ragingEffect,
                            radius: 30,
                            ease: 'Power1',
                            duration: 250,
                        }
                    },
                    {
                        at: 500,
                        tween: {
                            targets: this.ragingEffect,
                            fillAlpha: 0,
                            ease: 'Power1',
                            duration: 250,
                            onComplete: () => {
                                if(this.ragingEffect == null) return
                                
                                this.ragingEffect.setRadius(0)
                                this.ragingEffect.fillAlpha = 0.5
                            }
                        }
                    }
                ])

                this.ragingEffectController.repeat(-1)
                this.ragingEffectController.play()

                this.firingController = this.scene.time.addEvent({
                    delay: 100,
                    startAt: 100,
                    loop: true,
                    callback: () => {
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
            this.ragingEffectController.destroy()
            this.ragingEffectController.events.forEach(x => {
                this.scene.tweens.remove(x.tween as Phaser.Tweens.Tween)
            })
        }
        if(this.ragingEffect) this.ragingEffect.destroy()
        this.enemy.destroy()
        EventBus.emit("enemyDeath")
    }
}