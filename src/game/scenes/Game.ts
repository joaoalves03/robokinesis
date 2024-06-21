import {Player} from "../entities/Player";
import {Arena} from "../objects/Arena"
import {EnemyManager} from "../entities/enemies/EnemyManager"
import {EventBus} from "@/game/EventBus"
import {ChipManager} from "@/game/ChipManager"
import {Background} from "@/game/objects/Background"

export class GameScene extends Phaser.Scene {
    declare player: Player
    declare arena: Arena
    declare enemyManager?: EnemyManager
    private chipManager: ChipManager
    private background: Background
    private keyboard: Phaser.Input.Keyboard.KeyboardPlugin | null

    private music: any
    
    constructor() {
        super("gameScene")
    }

    create() {
        this.input.setPollAlways()
        this.input.mouse!.disableContextMenu();

        this.music = this.sound.add("music")
        this.music.setVolume(0.25)
        this.music.setLoop(true)
        this.music.play()
        
        this.background = new Background(this.matter.scene)
        this.arena = new Arena(this.matter.scene, 0, 0)
        this.player = new Player(this.matter.world, Phaser.Math.Between(0,1200), Phaser.Math.Between(0,1200))
        this.chipManager = new ChipManager(this.player)
        this.keyboard = this.input.keyboard
        
        this.cameras.main.setZoom(10, 10)
        
        EventBus.emit("startGame", this.chipManager)

        this.cameras.main.startFollow(this.player.getPlayer())

        const waveEnded = () => {
            this.cameras.main.stopFollow()
            this.cameras.main.setPosition(0, 0)
            this.cameras.main.zoomTo(0.5, 500, 'Linear', true)
            this.cameras.main.pan(600, 600, 500, 'Linear', true)
        }

        const game_startRound = () => {
            if(this.enemyManager == undefined) {
                this.enemyManager = new EnemyManager(this.matter.scene, this.player)
            }
            this.arena.newMap()
            this.enemyManager!.newWave(this.arena.getTiles(), this.player)
            this.cameras.main.zoomTo(2, 250, 'Linear', true)
            this.player.setHealth(100)
            const player = this.player.getPlayer()
            this.cameras.main.pan(player.x, player.y, 250, 'Linear', true);
            this.cameras.main.startFollow(player)
        }
        
        EventBus.on("waveEnded", waveEnded)
        EventBus.on("game_startRound", game_startRound)
        
        EventBus.on("playerDeath", () => {
            this.registry.set("playerPosition", {
                x: this.player.getPlayer().x,
                y: this.player.getPlayer().y,
                frame: this.player.getPlayer().anims.currentFrame,
                flip: this.player.getPlayer().flipX
            })
            this.enemyManager = undefined
            
            EventBus.removeListener("playerDeath")
            EventBus.removeListener("enemyDeath")
            EventBus.removeListener("game_startRound")
            EventBus.removeListener("waveEnded", waveEnded)
            
            this.music.stop()
            
            this.scene.start("gameOverScene")
        })
        
        this.input.keyboard!.on("keydown-ONE", () => {
            this.chipManager.enableChip(0)
        })

        this.input.keyboard!.on("keydown-TWO", () => {
            this.chipManager.enableChip(1)
        })

        this.input.keyboard!.on("keydown-THREE", () => {
            this.chipManager.enableChip(2)
        })
    }

    update() {
        if(this.keyboard!.addKey('ESC').isDown) {
            EventBus.emit("pause")
            this.scene.switch("pauseScene")
        }
        
        this.player.update()
        
        if(this.enemyManager)
            for(const [i, enemy] of this.enemyManager.getEnemies().entries()) {
                if(enemy.isDead())
                    this.enemyManager.removeEnemy(i)
                else
                    enemy.update()
            }
    }
}