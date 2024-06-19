import {BaseEnemy} from "@/game/entities/enemies/BaseEnemy"
import Phaser from "phaser"
import type {Player} from "@/game/entities/Player"
import {Explosion} from "@/game/items/weapons/misc/Explosion"

export class HectorEnemy extends BaseEnemy {
    private triggered = false
    
    constructor(world: Phaser.Physics.Matter.World, x: number, y: number, player: Player) {
        super(world, x, y, "enemies", 250, player)

        this.enemy.setOrigin(0.5, 0.5)
        
        this.enemy.setOnCollideWith(player.getPlayer().body as MatterJS.Body, () => {
            if(this.triggered) return

            this.triggered = true
            this.enemy.setVelocity(0,0)
            this.enemy.setStatic(true)

            const warningCircle = this.scene.add.circle(
                this.enemy.x,
                this.enemy.y,
                0,
                0xebb734,
                0.25
            )

            const repeatingCircle = this.scene.add.circle(
                this.enemy.x,
                this.enemy.y,
                0,
                0xff0000,
                0.25
            )

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

    update() {
        if (!this.triggered) {
            super.update()
            
            this.enemy.setRotation(
                Phaser.Math.Angle.Between(this.enemy.x, this.enemy.y, this.player.getPlayer().x, this.player.getPlayer().y)
            )

            const {x, y} = this.velocityToPlayer(1)

            this.enemy.setVelocity(x, y)
        }
    }
    
    takeDamage(damage: number) {
        if(!this.triggered)
            super.takeDamage(damage)
    }
}