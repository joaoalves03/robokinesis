import Phaser from "phaser"
import {EventBus} from "@/game/EventBus"

export class EnemyLaser extends Phaser.GameObjects.GameObjectFactory {
    private laser: Phaser.Physics.Matter.Image
    private speed: number = 10

    constructor(scene: Phaser.Scene, startX: number, startY: number, targetX: number, targetY: number) {
        super(scene)
        
        this.laser = scene.matter.add.gameObject(
            scene.add.rectangle(startX,startY,8,3, 0xab0e0e),
            {
                label: "enemyLaser"
            }
        ) as Phaser.Physics.Matter.Image
        this.laser.setFrictionAir(0)
        this.laser.setSensor(true)

        const angle = Math.atan2(targetY - startY,targetX - startX)

        this.laser.setRotation(angle)
        this.laser.setVelocity(
            this.speed * Math.cos(angle),
            this.speed * Math.sin(angle)
        )

        this.laser.setOnCollide((pair: Phaser.Types.Physics.Matter.MatterCollisionData) => {
            if(pair.bodyA.label == "player" || pair.bodyB.label == "player"){
                EventBus.emit("damagePlayer", 5)
            }

            this.laser.destroy()
        })
    }
}