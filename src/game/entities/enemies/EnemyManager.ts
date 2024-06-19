import {Zombie} from "../../entities/enemies/Zombie"
import {EventBus} from "@/game/EventBus"
import type {Player} from "@/game/entities/Player"
import type {BaseEnemy} from "@/game/entities/enemies/BaseEnemy"
import {PaulEnemy} from "@/game/entities/enemies/Paul"
import {FredEnemy} from "@/game/entities/enemies/Fred"
import {HectorEnemy} from "@/game/entities/enemies/Hector"
import Vector2 = Phaser.Math.Vector2

// Black magic
type Constructor<T = {}> = new (...args: any[]) => T

export class EnemyManager {
    private difficulty: number = 0
    private scene: Phaser.Scene
    private enemyCount: number = 0
    private enemies: BaseEnemy[] = []

    private static lowTierEnemies: Constructor<BaseEnemy>[] = [
        Zombie
    ]

    private static mediumTierEnemies: Constructor<BaseEnemy>[] = [
        HectorEnemy,
        FredEnemy
    ]

    private static highTierEnemies: Constructor<BaseEnemy>[] = [
        PaulEnemy
    ]
    
    constructor(scene: Phaser.Scene) {
        this.scene = scene

        EventBus.on("enemyDeath", () => {
            if(this.enemyCount <= 0) return
            
            this.enemyCount--
            
            if(this.enemyCount == 0)
                EventBus.emit("waveEnded")
        })
        
        EventBus.on("playerDeath", () => {
            this.difficulty = 0
            this.enemyCount = 0
            this.enemies = []
        })
    }

    newWave(tiles: (Phaser.GameObjects.Sprite | Vector2)[], player: Player) {
        this.difficulty++
        const validTiles = tiles.filter(x => x instanceof Vector2)
        
        for(let i = 0; i<this.difficulty; i++) {
            const selectedTile = validTiles[Math.floor(Math.random() * validTiles.length)]
            
            this.enemies.push(
                new EnemyManager.mediumTierEnemies[Math.floor(Math.random() * EnemyManager.mediumTierEnemies.length)](
                    this.scene.matter.world,
                    selectedTile.x,
                    selectedTile.y,
                    player
                )
            )

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