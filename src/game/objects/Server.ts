import Phaser from "phaser"

export class Server extends Phaser.GameObjects.Sprite {
    constructor(scene: Phaser.Scene, x: number, y: number) {
        super(scene, x, y, "server", 26)
        
        this.scene.add.existing(this)
        this.setScale(80/68)
        
        this.anims.create({
            key: 'spawn',
            frames: this.scene.anims.generateFrameNumbers('server', { start: 0, end: 23 }),
            frameRate: 16,
            repeat: 0
        })
        
        this.play("spawn")
    }
}