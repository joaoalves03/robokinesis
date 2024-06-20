import {EventBus} from "@/game/EventBus"

export class PauseScene extends Phaser.Scene {
    private keyboard: Phaser.Input.Keyboard.KeyboardPlugin | null
    
    constructor() {
        super("pauseScene")
    }
    
    create() {
        this.keyboard = this.input.keyboard
    }
    
    update() {
        if(this.keyboard!.addKey('ESC').isDown) {
            EventBus.emit("unpause")
            this.scene.switch("gameScene")
        }
    }
}