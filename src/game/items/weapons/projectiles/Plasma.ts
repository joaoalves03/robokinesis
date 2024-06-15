import Phaser from "phaser"

export class Plasma extends Phaser.GameObjects.GameObjectFactory {
    private plasma: Phaser.Physics.Matter.Sprite
    private plasmaScaleController: Phaser.Time.TimerEvent
    private speed: number = 10
    private maxScale = 2
    
    constructor(scene: Phaser.Scene, startX: number, startY: number) {
        super(scene)

        this.plasma = scene.matter.add.sprite(
            startX,
            startY,
            "plasma",
            0,
            {
                label: "plasma"
            }
        )
        this.plasma.setFrictionAir(0)
        this.plasma.anims.create({
            key: 'plasma_effect',
            frames: this.scene.anims.generateFrameNumbers('plasma', { start: 0, end: 4 }),
            frameRate: 10,
            repeat: -1
        })
        this.plasma.play("plasma_effect")
        
        this.plasmaScaleController = scene.time.addEvent({
            delay: 100,
            repeat: -1,
            callback: () => {
                if(this.plasma.scale < this.maxScale)
                    this.plasma.setScale(this.plasma.scale += 0.1)
            }
        })

        this.plasma.setOnCollide(() => {
            this.plasmaScaleController.destroy()
            this.plasma.destroy()
        })
    }
    
    updatePosition(x: number, y: number) {
        this.plasma.x = x
        this.plasma.y = y
    }
    
    release(targetX: number, targetY: number) {
        if(this.plasma) {
            const angle = Math.atan2(targetY - this.plasma.y,targetX - this.plasma.x)
        
            this.plasma.setVelocity(
                this.speed * Math.cos(angle),
                this.speed * Math.sin(angle)
            )
        }
    }
}