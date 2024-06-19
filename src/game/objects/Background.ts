export class Background extends Phaser.GameObjects.GameObjectFactory {
    constructor(scene: Phaser.Scene) {
        super(scene)
        
        for (let i = 0; i < 64; i++){
            for (let j = 0; j < 64; j++) {
                this.scene.add.image(-640 + i * 40,-640 + j * 40,"floor_tile")
                    .setScale(0.5)
                    .setTint(0x333333)
            }
        }
        
    }
}