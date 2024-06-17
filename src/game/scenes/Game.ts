import {Player} from "../entities/Player";
import {Arena} from "../objects/Arena"
import {EnemyManager} from "../entities/enemies/EnemyManager"
import {EventBus} from "@/game/EventBus"
import {ChipManager} from "@/game/ChipManager"

export class GameScene extends Phaser.Scene {
    declare player: Player
    declare arena: Arena
    declare enemyManager?: EnemyManager
    private chipManager: ChipManager


    constructor() {
        super("gameScene")
    }

    create() {
        this.input.setPollAlways()

        this.arena = new Arena(this.matter.scene, 0, 0)
        this.player = new Player(this.matter.world, 50, 50)
        this.chipManager = new ChipManager(this.player)

        this.cameras.main.setZoom(10, 10)
        
        EventBus.emit("startGame", this.chipManager)

        this.cameras.main.startFollow(this.player.getPlayer())

        this.arena.findPath()
        
        EventBus.on("waveEnded", () => {
            this.cameras.main.stopFollow()
            this.cameras.main.setPosition(0, 0)
            this.cameras.main.zoomTo(0.5, 500, 'Linear', true)
            this.cameras.main.pan(600, 600, 500, 'Linear', true);
        })

        EventBus.on("startRound", () => {
            if(this.enemyManager == undefined)
                this.enemyManager = new EnemyManager(this.matter.scene)
            
            this.enemyManager!.newWave(this.arena.getTiles(), this.player)
            this.cameras.main.zoomTo(1.0, 250, 'Linear', true)
            this.player.setHealth(100)
            const player = this.player.getPlayer()
            this.cameras.main.pan(player.x, player.y, 250, 'Linear', true);
            this.cameras.main.startFollow(player)
        })
    }

    update() {
        this.player.update()
        
        if(this.enemyManager)
            for(const [i, enemy] of this.enemyManager.getEnemies().entries()) {
                if(enemy.isDead())
                    this.enemyManager.removeEnemy(i)
                else
                    enemy.update()
            }
        //console.log(EnemyManager.getInstance().getEnemiesLeft())
    }
}