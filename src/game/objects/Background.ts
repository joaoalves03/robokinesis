export class Background extends Phaser.GameObjects.GameObjectFactory {
    constructor(scene: Phaser.Scene) {
        super(scene)
        
        scene.add.rectangle(640, 640, 4000, 4000, 0x000044)
        
        
        for (let i = 0; i < 500; i++) {
            this.scene.add.circle(
                Phaser.Math.Between(-1020, 1980),
                Phaser.Math.Between(-1020, 1980),
                2,
                0xffffff,
                Phaser.Math.Between(0.5, 0.75),
            )
        }
    }
}