import {EventBus} from "@/game/EventBus"
import Phaser from "phaser"

export class Explosion extends Phaser.GameObjects.GameObjectFactory {
    private visuals: Phaser.GameObjects.Sprite

    constructor(scene: Phaser.Scene, x: number, y: number, radius: number = 40, damage: boolean = true) {
        super(scene)

        if(radius >= 180) this.scene.sound.play("explosion_huge", {volume: 0.04})
        else {
            this.scene.time.addEvent({
                delay: Phaser.Math.Between(10, 60),
                callback: () => {this.scene.sound.play("explosion", {volume: 0.01})}
            })
        }
        
        if (damage) {
            const trigger = this.scene.matter.add.circle(
                x,
                y,
                radius,
                {
                    isStatic: true,
                    label: "explosion",
                    onCollideCallback: (pair: Phaser.Types.Physics.Matter.MatterCollisionData) => {
                        if (pair.bodyA.label == "player" || pair.bodyB.label == "player") {
                            const pos = 
                                pair.bodyA.label == "player" ? pair.bodyA.position : pair.bodyB.position

                            const dx = pos.x - x
                            const dy = pos.y - y
                            
                            EventBus.emit(
                                "damagePlayer",
                                (((-19/15) * Math.sqrt(dx * dx + dy * dy) + 400) / 1250) * radius
                            )
                        }
                    }
                }
            )

            scene.time.addEvent({
                delay: 10,
                callback: () => {
                    this.scene.matter.world.remove(trigger)
                }
            })
        }

        this.visuals = this.scene.add.sprite(
            x,
            y,
            "explosions"
        ).setDepth(6).setScale(radius / 24)

        this.visuals.anims.create({
            key: 'explosion1',
            frames: this.scene.anims.generateFrameNumbers('explosions', {start: 0, end: 8}),
            frameRate: 24,
            repeat: 0
        })

        this.visuals.anims.create({
            key: 'explosion2',
            frames: this.scene.anims.generateFrameNumbers('explosions', {start: 9, end: 17}),
            frameRate: 24,
            repeat: 0
        })

        this.visuals.on("animationcomplete", () => {
            this.visuals.destroy()
        })

        this.visuals.play(
            Math.random() < 0.5
                ? "explosion1"
                : "explosion2"
        )
    }
}