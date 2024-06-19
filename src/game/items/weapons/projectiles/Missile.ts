import Phaser from "phaser"
import {Explosion} from "../misc/Explosion"

export class Missile extends Phaser.GameObjects.GameObjectFactory {
    private missile: Phaser.Physics.Matter.Image
    private speed: number = 10

    constructor(scene: Phaser.Scene, startX: number, startY: number, targetX: number, targetY: number) {
        super(scene)

        this.missile = scene.matter.add.gameObject(
            scene.add.rectangle(startX,startY,5,5,0x62912f),
            {
                label: "missile"
            }
        ) as Phaser.Physics.Matter.Image
        this.missile.setFrictionAir(0)

        const angle = Math.atan2(targetY - startY,targetX - startX)

        this.missile.setVelocity(
            this.speed * Math.cos(angle),
            this.speed * Math.sin(angle)
        )

        this.missile.setOnCollide(() => {
            new Explosion(scene, this.missile.x, this.missile.y)
            
            this.scene.time.addEvent({
                delay: 1,
                callback: () => {this.missile.destroy()}
            })
        })
    }
}