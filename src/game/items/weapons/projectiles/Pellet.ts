import Phaser from "phaser"

export class Pellet extends Phaser.GameObjects.GameObjectFactory {
    private pellet: Phaser.Physics.Matter.Image
    
    constructor(scene: Phaser.Scene, startX: number, startY: number, targetX: number, targetY: number) {
        super(scene)
        
        this.pellet = scene.matter.add.gameObject(
            scene.add.circle(startX, startY, 2, 0x000000),
            {
                label: "pellet"
            }
        ) as Phaser.Physics.Matter.Image
        this.pellet.setFrictionAir(0)

        const angle = Math.atan2(targetY - startY, targetX - startX) + Phaser.Math.FloatBetween(-0.25,0.25)
        
        this.pellet.setVelocity(
            20 * Math.cos(angle),
            20 * Math.sin(angle)
        )

        this.pellet.setOnCollide((pair: Phaser.Types.Physics.Matter.MatterCollisionData) => {
            if(pair.bodyA.label == "pellet" && pair.bodyB.label == "pellet") {
                return
            }
            
            this.pellet.destroy()
        })
    }
}