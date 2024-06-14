import eugene from '/assets/eugene.png'
import enemies from '/assets/enemies.png'
import rocketLauncher from '/assets/weapons/rocketlauncher.png'

export class LoadScene extends Phaser.Scene {
    constructor() {
        super("loadScene")
    }
    
    preload() {
        this.load.spritesheet("player", eugene, {
            frameWidth: 20,
            frameHeight: 32,
        })
        this.load.image("rocketLauncher", rocketLauncher)
        this.load.spritesheet("enemies", enemies, {frameWidth: 32, frameHeight: 32})
        
        this.load.on("complete", () => {
            this.scene.switch("gameScene")
        })
    }
}