import {Player} from "../entities/Player";
import eugene from '/assets/eugene.png'
import enemies from '/assets/enemies.png'
import rocketLauncher from '/assets/weapons/rocketlauncher.png'
import {Arena} from "../objects/Arena"
import {EnemyManager} from "../entities/enemies/EnemyManager"
import {EventBus} from "@/game/EventBus"

export class GameScene extends Phaser.Scene {
    declare player: Player
    declare arena: Arena
    declare enemyManager: EnemyManager


    constructor() {
        super("gameScene")
    }

    preload() {
        this.load.image("player", eugene)
        this.load.image("rocketLauncher", rocketLauncher)
        this.load.spritesheet("enemies", enemies, {frameWidth: 32, frameHeight: 32})
    }

    create() {
        this.input.setPollAlways()

        this.arena = new Arena(this.matter.scene, 0, 0)
        this.player = new Player(this.matter.world, 50, 50)

        this.enemyManager = new EnemyManager(this.matter.scene)
        this.enemyManager.newWave(this.arena.getTiles())

        this.cameras.main.startFollow(this.player.getPlayer())
        this.cameras.main.setZoom(1.5,1.5)

        EventBus.on("waveEnded", () => {
            this.cameras.main.stopFollow()
            this.cameras.main.setPosition(0, 0)
            this.cameras.main.zoomTo(0.5, 500, 'Linear', true)
            this.cameras.main.pan(600, 600, 500, 'Linear', true);
        })

        EventBus.on("selectCard", () => {
            this.enemyManager.newWave(this.arena.getTiles())
            this.cameras.main.zoomTo(1.5, 250, 'Linear', true)
            const player = this.player.getPlayer()
            this.cameras.main.pan(player.x, player.y, 250, 'Linear', true);
            this.cameras.main.startFollow(player)
        })
    }

    update() {
        this.player.update()
        //console.log(EnemyManager.getInstance().getEnemiesLeft())
    }
}