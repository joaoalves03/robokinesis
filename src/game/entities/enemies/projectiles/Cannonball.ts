import Phaser from "phaser"
import {EventBus} from "@/game/EventBus"

export class EnemyCannonball extends Phaser.GameObjects.GameObjectFactory {
    private cannonball: Phaser.Physics.Matter.Image
    private speed: number = 10

    constructor(scene: Phaser.Scene, startX: number, startY: number, targetX: number, targetY: number) {
        super(scene)
        
        this.cannonball = scene.matter.add.gameObject(
            scene.add.circle(startX,startY,10,0x242424),
            {
                label: "enemyCannonball"
            }
        ) as Phaser.Physics.Matter.Image
        this.cannonball.setFrictionAir(0.004).setDepth(6)

        const angle = Math.atan2(targetY - startY,targetX - startX)
        
        this.cannonball.setVelocity(
            this.speed * Math.cos(angle),
            this.speed * Math.sin(angle)
        )
        
        //this.cannonball.setBounce(1)
        this.cannonball.setDensity(10)
        
        this.scene.sound.play("cannon", {volume: 0.25})
        
        this.scene.time.addEvent({
            delay: 4000,
            callback: () => {
                this.scene.tweens.add({
                    duration: 500,
                    targets: this.cannonball,
                    ease: 'Sine.easeInOut',
                    alpha: 0,
                    onComplete: () => { this.cannonball.destroy() }
                })
            }
        })
        
        this.cannonball.setOnCollide((pair: Phaser.Types.Physics.Matter.MatterCollisionData) => {
            if(pair.bodyA.label == "player" || pair.bodyB.label == "player"){
                EventBus.emit("damagePlayer", 15)
            }
        })
    }
}