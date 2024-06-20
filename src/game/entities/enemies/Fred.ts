import {BaseEnemy} from "@/game/entities/enemies/BaseEnemy"
import Phaser from "phaser"
import type {Player} from "@/game/entities/Player"
import {EventBus} from "@/game/EventBus"
import {EnemyCannonball} from "@/game/entities/enemies/projectiles/Cannonball"
import Vector2 = Phaser.Math.Vector2

export class FredEnemy extends BaseEnemy {
    firingController: Phaser.Tweens.TweenChain
    firing: boolean = false
    private referencePoint: Phaser.GameObjects.Rectangle
    
    constructor(world: Phaser.Physics.Matter.World, x: number, y: number, player: Player) {
        super(world, x, y, "fred", 100, player)

        this.enemy.setOrigin(0.5, 0.5)
        this.enemy.setFrictionAir(0.04)

        this.createAnimations()

        this.enemy.play("idleDown")
        
        this.referencePoint = this.scene.add.rectangle(this.enemy.x, this.enemy.y, 1, 1, 0, 0)
        
        this.firingController = this.scene.tweens.chain({
            targets: this.enemy,
            loop: -1,
            loopDelay: 2250,
            delay: 2500,
            onStart: () => {
                this.enemy.stop()
                this.firing = true
                this.enemy.play("growingDown", true)
            },
            onLoop: () => {
                this.enemy.stop()
                this.firing = true
                this.enemy.play("growingDown", true)
            },
            tweens: [
                {
                    scale: 2,
                    duration: 2500,
                    ease: 'Linear',
                    onComplete: () => {
                        const player = this.player.getPlayer()

                        this.enemy.play("firingDown", true)
                        
                        new EnemyCannonball(
                            this.scene,
                            this.enemy.x + 20 * Math.cos(this.referencePoint.rotation),
                            this.enemy.y + 20 * Math.sin(this.referencePoint.rotation),
                            player.x,
                            player.y
                        )

                        this.enemy.applyForce(new Vector2(
                            0.004 * -Math.cos(this.referencePoint.rotation),
                            0.004 * -Math.sin(this.referencePoint.rotation)
                        ))
                    }
                },
                {
                    delay: 500,
                    scale: 1,
                    duration: 250,
                    ease: 'Sine.easeInOut',
                    onComplete: () => {this.firing = false}
                }
            ]
        })
    }

    createAnimations() {
        this.enemy.anims.create({
            key: 'idleDown',
            frames: this.scene.anims.generateFrameNumbers('fred', { start: 0, end: 3 }),
            frameRate: 5,
            repeat: -1
        })

        this.enemy.anims.create({
            key: 'idleUp',
            frames: this.scene.anims.generateFrameNumbers('fred', { start: 20, end: 23 }),
            frameRate: 5,
            repeat: -1
        })

        this.enemy.anims.create({
            key: 'growingDown',
            frames: this.scene.anims.generateFrameNumbers('fred', { start: 40, end: 46 }),
            frameRate: 5,
            repeat: 0
        })

        this.enemy.anims.create({
            key: 'growingUp',
            frames: this.scene.anims.generateFrameNumbers('fred', { start: 60, end: 66 }),
            frameRate: 5,
            repeat: 0
        })

        this.enemy.anims.create({
            key: 'firingUp',
            frames: this.scene.anims.generateFrameNumbers('fred', { start: 47, end: 59 }),
            frameRate: 12,
            repeat: 0
        })

        this.enemy.anims.create({
            key: 'firingDown',
            frames: this.scene.anims.generateFrameNumbers('fred', { start: 47, end: 59 }),
            frameRate: 12,
            repeat: 0
        })
    }
    
    update() {
        super.update()

        this.enemy.setAngularVelocity(0)
        
        if(!this.firing) {
            if(this.referencePoint.angle < 0) {
                this.enemy.play("idleUp", true)
            } else {
                this.enemy.play("idleDown", true)
            }
        }

        this.enemy.setFlipX(!(this.referencePoint.angle < 90 && this.referencePoint.angle >= -90))
        //console.log(this.referencePoint.angle)
        
        this.referencePoint.setRotation(
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