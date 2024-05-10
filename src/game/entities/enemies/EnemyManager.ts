import {Zombie} from "../../entities/enemies/Zombie"
import {EventBus} from "../../../game/EventBus"

export class EnemyManager {
    private difficulty: number = 1
    private scene: Phaser.Scene
    private enemyCount: number = 0

    constructor(scene: Phaser.Scene) {
        this.scene = scene

        EventBus.on("enemyDeath", () => {
            if(this.enemyCount <= 0) return

            this.enemyCount--
            this.scene.events.emit("waveEnded")
        })
    }

    newWave(tiles: Phaser.GameObjects.Rectangle[]) {
        for(let i = 0; i<this.difficulty; i++) {
            let selectedTile: Phaser.GameObjects.Rectangle
            do {
                selectedTile = tiles[Math.floor(Math.random() * tiles.length)]
            } while(selectedTile.fillColor != 0xeeeeee)

            new Zombie(
                this.scene.matter.world,
                selectedTile.x,
                selectedTile.y
            )

            this.enemyCount++
        }
    }

    getEnemiesLeft(): number { return this.enemyCount }
}