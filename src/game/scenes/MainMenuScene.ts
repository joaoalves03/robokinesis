import {EventBus} from "@/game/EventBus"

export class MainMenuScene extends Phaser.Scene {
    constructor() {
        super("mainMenuScene")
        
        const play = () => {
            this.scene.start("gameScene")
        }
        
        const mapEditor = () => {
            this.scene.start("mapEditorScene")
        }
        
        EventBus.on("play", play)
        EventBus.on("mapEditor", mapEditor)
    }
    
    create() {
        const player = this.add.sprite(
            160,
            360,
            "player"
        )
            .setScale(8,8)

        player.anims.create({
            key: 'idle',
            frames: this.anims.generateFrameNumbers('player', { start: 0, end: 2 }),
            frameRate: 5,
            repeat: -1
        })
        
        player.play("idle")
    }
}