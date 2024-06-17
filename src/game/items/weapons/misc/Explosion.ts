import {EventBus} from "@/game/EventBus"

export class Explosion extends Phaser.GameObjects.GameObjectFactory {
    private trigger
    private visuals: Phaser.GameObjects.Arc
    
    constructor(scene: Phaser.Scene, x: number, y: number, radius: number = 40) {
        super(scene)

        this.trigger = this.scene.matter.add.circle(
            x,
            y,
            radius,
            {
                isStatic: true,
                label: "explosion",
                onCollideCallback: (pair: any) => {
                    if (pair.bodyA.label == "player" || pair.bodyB.label == "player") {
                        EventBus.emit("damagePlayer", 10)
                    }
                }
            }
        )

        scene.time.addEvent({
            delay: 10,
            callback: () => {
                this.scene.matter.world.remove(this.trigger)
            }
        })

        this.visuals = this.scene.add.circle(
            x,
            y,
            radius,
            0xff0000
        )

        this.scene.tweens.add({
            targets: this.visuals,
            alpha: 0,
            ease: 'Sine.easeInOut',
            duration: 500,
            onComplete: () => {
                this.visuals.destroy()
            }
        })
    }
}