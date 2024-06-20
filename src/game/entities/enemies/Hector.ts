import {BaseEnemy} from "@/game/entities/enemies/BaseEnemy"
import Phaser from "phaser"
import type {Player} from "@/game/entities/Player"
import {Explosion} from "@/game/items/weapons/misc/Explosion"

export class HectorEnemy extends BaseEnemy {
    private triggered = false
    private referencePoint: Phaser.GameObjects.Rectangle
    private walk
    
    constructor(world: Phaser.Physics.Matter.World, x: number, y: number, player: Player) {
        super(world, x, y, "hector", 250, player)

        this.walk = this.scene.sound.add("walk_heavy")
        this.walk.setVolume(0.005)
        
        this.referencePoint = this.scene.add.rectangle(this.enemy.x, this.enemy.y, 1, 1, 0, 0)
        
        this.createAnimations()
        
        this.enemy.setOrigin(0.5, 0.5)
        
        this.enemy.setOnCollideWith(player.getPlayer().body as MatterJS.Body, () => {
            if(this.triggered) return

            this.walk.stop()
            
            this.triggered = true
            this.enemy.setVelocity(0,0)
            this.enemy.setStatic(true)

            this.enemy.setTexture("hectorInflating")
            this.enemy.play("inflate1")
            this.enemy.setPosition(this.enemy.x, this.enemy.y-14)
            
            this.enemy.on("animationcomplete", () => {
                this.enemy.play("inflate2")
                
                this.scene.tweens.add({
                    targets: this.enemy.anims,
                    msPerFrame: 10,
                    duration: 4000
                })
            })
            
            const warningCircle = this.scene.add.circle(
                this.enemy.x,
                this.enemy.y,
                0,
                0xebb734,
                0.25
            ).setDepth(5)

            const repeatingCircle = this.scene.add.circle(
                this.enemy.x,
                this.enemy.y,
                0,
                0xff0000,
                0.25
            ).setDepth(5)

            this.scene.add.tween({
                duration: 500,
                targets: warningCircle,
                radius: 360,
                ease: 'Sine.easeInOut'
            })

            this.scene.tweens.chain({
                targets: repeatingCircle,
                loop: 5,
                tweens: [
                    {
                        radius: 360,
                        duration: 500,
                        ease: 'Sine.easeInOut'
                    },
                    {
                        alpha: 0,
                        duration: 500,
                        ease: 'Sine.easeInOut'
                    },
                    {
                        radius: 0,
                        alpha: 0.25,
                        duration: 0
                    },
                ],
                onComplete: () => {
                    new Explosion(this.scene, this.enemy.x, this.enemy.y, 360)
                    warningCircle.destroy()
                    repeatingCircle.destroy()
                    this.die()
                }
            })
        })
    }

    createAnimations() {
        this.enemy.anims.create({
            key: 'runningDown',
            frames: this.scene.anims.generateFrameNumbers('hector', { start: 8, end: 10 }),
            frameRate: 12,
            repeat: -1
        })
        
        this.enemy.anims.create({
            key: 'runningUp',
            frames: this.scene.anims.generateFrameNumbers('hector', { start: 12, end: 14 }),
            frameRate: 12,
            repeat: -1
        })

        this.enemy.anims.create({
            key: 'inflate1',
            frames: this.scene.anims.generateFrameNumbers('hectorInflate', { start: 0, end: 3 }),
            frameRate: 5,
            repeat: 0,
        })

        this.enemy.anims.create({
            key: 'inflate2',
            frames: this.scene.anims.generateFrameNumbers('hectorInflate', { start: 5, end: 9 }),
            frameRate: 12,
            repeat: -1,
        })
    }
    
    update() {
        if (!this.triggered) {
            super.update()

            this.enemy.setFlipX(!(this.referencePoint.angle < 90 && this.referencePoint.angle >= -90))
            this.referencePoint.setPosition(this.enemy.x, this.enemy.y)
            this.enemy.setAngularVelocity(0)
            this.referencePoint.setRotation(
                Phaser.Math.Angle.Between(this.enemy.x, this.enemy.y, this.player.getPlayer().x, this.player.getPlayer().y)
            )

            const {x, y} = this.velocityToPlayer(1)

            this.enemy.setVelocity(x, y)

            if(this.enemy.getVelocity().y > 0) {
                this.enemy.play("runningDown", true)
            } else {
                this.enemy.play("runningUp", true)
            }

            if(!this.walk.isPlaying) this.walk.play()
        }
    }
    
    takeDamage(damage: number) {
        if(!this.triggered)
            super.takeDamage(damage)
    }
    
    die() {
        super.die()
        this.walk.stop()
    }
}