import {EventBus} from "@/game/EventBus"

export class GameOverScene extends Phaser.Scene {
    constructor() {
        super("gameOverScene")
    }

    create() {
        const pos: {x: number, y: number} = this.registry.get("playerPosition")
        
        const player = this.add.sprite(
            pos.x,
            pos.y,
            "player"
        )
        
        this.add.text(pos.x, pos.y, "DEATH ANIMATION PLEASE")
        
        this.cameras.main.setZoom(2,2)
        this.cameras.main.startFollow(player)
        
        this.time.addEvent({
            delay: 2000,
            callback: () => {EventBus.emit("showGameOverScreen")}
        })
    }
}