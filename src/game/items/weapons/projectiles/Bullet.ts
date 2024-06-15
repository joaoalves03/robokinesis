import Phaser from "phaser"

export class Bullet extends Phaser.GameObjects.GameObjectFactory {
    private bullet: Phaser.Physics.Matter.Image
    private speed: number = 20

    constructor(scene: Phaser.Scene, startX: number, startY: number, targetX: number, targetY: number) {
        super(scene)

        this.bullet = scene.matter.add.gameObject(
            scene.add.rectangle(startX,startY,10,5,0xbf9924),
            {
                label: "bullet"
            }
        ) as Phaser.Physics.Matter.Image
        this.bullet.setFrictionAir(0)

        const angle = Math.atan2(targetY - startY,targetX - startX)

        this.bullet.setRotation(angle)
        
        this.bullet.setVelocity(
            this.speed * Math.cos(angle),
            this.speed * Math.sin(angle)
        )

        this.bullet.setOnCollide((_: any) => {
            this.bullet.destroy()
        })
    }
}