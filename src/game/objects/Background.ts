export class Background extends Phaser.GameObjects.GameObjectFactory {
    constructor(scene: Phaser.Scene) {
        super(scene)
        const texture = this.scene.textures.get("ground_spots")
        
        for (let i = 0; i < 64; i++){
            for (let j = 0; j < 64; j++) {
                this.scene.add.image(-640 + i * 40,-640 + j * 40,"floor_tile")
                    .setScale(0.5)
                    .setTint(0x333333)
                    .setDepth(0)
                
                if(Math.random() < 0.2) {
                    this.scene.add.sprite(
                        -640 + i * 80,-640 + j * 80,
                        "ground_spots",
                        Phaser.Math.Between(0, texture.frameTotal - 2)
                    )
                        .setScale(0.5)
                        .setDepth(1)
                        .setTint(0x333333)
                }
            }
        }
        
    }
}