import Phaser from "phaser"
import {Explosion} from "@/game/items/weapons/misc/Explosion"

export class Grenade extends Phaser.GameObjects.GameObjectFactory {
    private grenade: Phaser.Physics.Matter.Image
    private speed: number = 10
    
    constructor(scene: Phaser.Scene, startX: number, startY: number, targetX: number, targetY: number) {
        super(scene)

        this.grenade = scene.matter.add.gameObject(
            scene.add.circle(startX, startY, 5, 0x44ff44),
            {
                label: "grenade"
            }
        ) as Phaser.Physics.Matter.Image

        const angle = Math.atan2(targetY - startY, targetX - startX)
        this.grenade.setRotation(angle)

        this.grenade.setVelocity(
            this.speed * Math.cos(angle),
            this.speed * Math.sin(angle)
        )

        scene.time.addEvent({
            delay: 2000,
            callback: () => {
                new Explosion(scene, this.grenade.x, this.grenade.y, 40)
                this.grenade.destroy()
            }
        })
    }
}