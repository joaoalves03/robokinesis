import Phaser from "phaser"

export class KnockbackBomb extends Phaser.GameObjects.GameObjectFactory {
    private bomb: Phaser.Physics.Matter.Image

    constructor(scene: Phaser.Scene, startX: number, startY: number, targetX: number, targetY: number) {
        super(scene)

        this.bomb = scene.matter.add.gameObject(
            scene.add.circle(startX, startY, 5, 0x000000),
            {
                label: "knockbackBomb"
            }
        ) as Phaser.Physics.Matter.Image
        this.bomb.setFrictionAir(0).setDepth(6)

        const angle = Math.atan2(targetY - startY, targetX - startX)

        this.bomb.setVelocity(
            10 * Math.cos(angle),
            10 * Math.sin(angle)
        )

        /*this.bomb.setOnCollide((pair: Phaser.Types.Physics.Matter.MatterCollisionData) => {
            if(pair.bodyA.label == "knockbackBomb") 
                this.knockbackTarget(pair.bodyA.gameObject, pair.bodyB.gameObject)
            else if (pair.bodyB.label == "knockbackBomb")
                this.knockbackTarget(pair.bodyB.gameObject, pair.bodyA.gameObject)
            
            this.scene.time.addEvent({
                delay: 10,
                callback: () => {this.bomb.destroy()}
            })
        })*/
    }
    
    /*knockbackTarget(source: BodyType, target: BodyType) {
        if(
            source.body == undefined 
            || target == null
            || target.body == null) return

        console.log(source)
        console.log(target)
        
        this.scene.time.addEvent({
            delay: 1,
            callback: () => {
                const angle = Math.atan2(
                    source.body.position.x - source.body.position.y,
                    target.body.position.y - target.body.position.x
                )
                this.scene.matter.applyForce(target, {
                    x: .1 * -Math.cos(angle),
                    y: .1 * -Math.sin(angle)
                })
                
                
            }
        })
    }*/
}