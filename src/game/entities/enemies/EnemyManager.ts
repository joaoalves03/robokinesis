import {Zombie} from "../../entities/enemies/Zombie"
import {EventBus} from "@/game/EventBus"
import type {Player} from "@/game/entities/Player"
import type {BaseEnemy} from "@/game/entities/enemies/BaseEnemy"
import {PaulEnemy} from "@/game/entities/enemies/Paul"

export class EnemyManager {
    private difficulty: number = 0
    private scene: Phaser.Scene
    private enemyCount: number = 0
    private enemies: BaseEnemy[] = []
    
    constructor(scene: Phaser.Scene) {
        this.scene = scene

        EventBus.on("enemyDeath", () => {
            if(this.enemyCount <= 0) return
            
            this.enemyCount--
            
            if(this.enemyCount == 0)
                EventBus.emit("waveEnded")
        })
    }

    newWave(tiles: Phaser.GameObjects.Rectangle[][], player: Player) {
        this.difficulty++
        
        for(let i = 0; i<this.difficulty; i++) {
            let selectedTile: Phaser.GameObjects.Rectangle
            do {
                selectedTile = tiles[Math.floor(Math.random() * tiles.length)][Math.floor(Math.random() * tiles.length)]
            } while(selectedTile.fillColor != 0xeeeeee)

            this.enemies.push(new PaulEnemy(
                this.scene.matter.world,
                selectedTile.x,
                selectedTile.y,
                player
            ))

            this.enemyCount++
        }

        EventBus.emit("newWave")
        EventBus.emit("updateEnemyCount", this.enemyCount)
    }

    getEnemiesLeft(): number { return this.enemyCount }
    
    getEnemies() { return this.enemies }
    
    removeEnemy(x: number) {
        this.enemies.slice(x, 1)
    }
}