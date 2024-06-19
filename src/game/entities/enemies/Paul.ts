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
    ragingEffectTween: Phaser.Tweens.TweenChain

    constructor(world: Phaser.Physics.Matter.World, x: number, y: number, player: Player) {
        super(world, x, y, "paul", 200, player)

        this.enemy.anims.create({
            key: 'idle',
            frames: this.scene.anims.generateFrameNumbers('paul', { start: 0, end: 3 }),
            frameRate: 5,
            repeat: -1
        })

        this.enemy.anims.create({
            key: 'idleToRage',
            frames: this.scene.anims.generateFrameNumbers('paul', { start: 13, end: 14 }),
            frameRate: 5,
            repeat: 0
        })

        this.enemy.anims.create({
            key: 'rage',
            frames: this.scene.anims.generateFrameNumbers('paul', { start: 25, end: 36 }),
            frameRate: 5,
            repeat: -1
        })
        
        this.enemy.play("idle")
        
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
                            if(this.enemy) {
                                const angle
                                    = Phaser.Math.Angle.Between(
                                    this.enemy.x, this.enemy.y, this.player.getPlayer().x, this.player.getPlayer().y)

                                new EnemyLaser(
                                    this.scene,
                                    (this.enemy.x + 20) * Math.cos(angle),
                                    (this.enemy.y + 20) * Math.sin(angle),
                                    this.player.getPlayer().x * Math.cos(angle),
                                    this.player.getPlayer().y * Math.sin(angle)
                                )
                            }
                        }
                    )
                }
            }
        })
        
        this.ragingController = this.scene.time.addEvent({
            delay: 5000,
            callback: () => {
                this.enemy.play("idleToRage")

                this.scene.tweens.add({
                    targets: this.enemy,
                    duration: 600,
                    scale: 1.4
                })
                
                this.enemy.on("animationcomplete", () => {
                    this.enemy.play("rage")
                    this.raging = true
                    this.firingController.destroy()

                    this.ragingEffectTween = this.scene.tweens.chain({
                        targets: this.ragingEffect,
                        loop: -1,
                        tweens: [
                            {
                                radius: 30,
                                duration: 250,
                                ease: 'Sine.easeInOut'
                            },
                            {
                                alpha: 0.25,
                                duration: 250,
                                yoyo: true,
                                ease: 'Sine.easeInOut'
                            },
                        ],
                    })

                    this.firingController = this.scene.time.addEvent({
                        delay: 100,
                        startAt: 100,
                        loop: true,
                        callback: () => {
                            if(this.enemy) {
                                const angle
                                    = Phaser.Math.Angle.Between(
                                        this.enemy.x, this.enemy.y, this.player.getPlayer().x, this.player.getPlayer().y)
                                
                                new EnemyLaser(
                                    this.scene,
                                    this.enemy.x + 50 * Math.cos(angle),
                                    this.enemy.y + 50 * Math.sin(angle),
                                    this.player.getPlayer().x * Math.cos(angle),
                                    this.player.getPlayer().y * Math.sin(angle)
                                )
                            }
                        }
                    })
                })
            }
        })
    }

    update() {
        super.update()
        
        if (this.raging) {
            //this.enemy.rotation += 0.005 * this.scene.sys.game.loop.delta
            
            // I love null checks
            if(this.ragingEffect) {
                this.ragingEffect.setPosition(this.enemy.x, this.enemy.y)
            }
        } /*else
            this.enemy.setRotation(
                Phaser.Math.Angle.Between(this.enemy.x, this.enemy.y, this.player.getPlayer().x, this.player.getPlayer().y)
            )*/
    }
    
    die() {
        this.firingController.destroy()
        this.ragingController.destroy()
        if (this.raging) {
            this.ragingEffectTween.destroy()
        }
        if(this.ragingEffect) this.ragingEffect.destroy()
        this.enemy.destroy()
        EventBus.emit("enemyDeath")
    }
}