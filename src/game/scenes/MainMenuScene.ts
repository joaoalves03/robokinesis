import {EventBus} from "@/game/EventBus"

export class MainMenuScene extends Phaser.Scene {
    private music: any
    
    constructor() {
        super("mainMenuScene")
        
        const play = () => {
            this.music.stop()
            this.scene.start("gameScene")
        }
        
        const mapEditor = () => {
            this.music.stop()
            this.scene.start("mapEditorScene")
        }
        
        EventBus.on("play", play)
        EventBus.on("mapEditor", mapEditor)
    }
    
    create() {
        this.music = this.sound.add("ambience")
        this.music.setVolume(0.5)
        this.music.setLoop(true)
        this.music.play()
        
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