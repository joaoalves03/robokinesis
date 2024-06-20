import {Pogo} from "./Pogo"
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
    private enemies: BaseEnemy[] = []
    private enemyCount: number = 0
    
    private probabilities = [0.8, 0.15, 0.05]
    private enemyIncreaseFactor = 1.1
    private probabilityIncreaseFactor = 1.05

    private static lowTierEnemies: Constructor<BaseEnemy>[] = [
        Pogo
    ]

    private static mediumTierEnemies: Constructor<BaseEnemy>[] = [
        HectorEnemy,
        FredEnemy
    ]

    private static highTierEnemies: Constructor<BaseEnemy>[] = [
        PaulEnemy
    ]
    
    constructor(scene: Phaser.Scene, player: Player) {
        this.scene = scene

        EventBus.on("enemyDeath", () => {
            this.scene.time.addEvent({
                delay: 1,
                callback: () => {
                    if(this.enemyCount <= 0 || player.getHealth() <= 0) return

                    this.enemyCount--

                    if(this.enemyCount == 0)
                        EventBus.emit("waveEnded")
                }
            })
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
        
        const nEnemies = 4 * (Math.pow(this.enemyIncreaseFactor, this.difficulty))

        let lowProb = this.probabilities[0] * (this.probabilityIncreaseFactor ** this.difficulty)
        let mediumProb = this.probabilities[1] * (this.probabilityIncreaseFactor ** this.difficulty)
        const highProb = this.probabilities[2] * (this.probabilityIncreaseFactor ** this.difficulty)

        const totalProb = lowProb + mediumProb + highProb
        lowProb /= totalProb
        mediumProb /= totalProb
        
        for(let i = 0; i<nEnemies; i++) {
            const selectedTile = validTiles[Math.floor(Math.random() * validTiles.length)]
            
            const rand = Math.random()
            
            this.enemies.push(
                rand < lowProb
                    ? new EnemyManager.lowTierEnemies[Math.floor(Math.random() * EnemyManager.lowTierEnemies.length)](
                        this.scene.matter.world,
                        selectedTile.x,
                        selectedTile.y,
                        player
                    ) 
                    : rand < lowProb + mediumProb
                        ? new EnemyManager.mediumTierEnemies[Math.floor(Math.random() * EnemyManager.mediumTierEnemies.length)](
                            this.scene.matter.world,
                            selectedTile.x,
                            selectedTile.y,
                            player
                        ) : new EnemyManager.highTierEnemies[Math.floor(Math.random() * EnemyManager.highTierEnemies.length)](
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