import {Player} from "../entities/Player";
import playerShip from '/assets/playerShip.png'
import enemies from '/assets/enemies.png'
import {Arena} from "../objects/Arena"
import {EnemyManager} from "../entities/enemies/EnemyManager"

export class GameScene extends Phaser.Scene {
    declare player: Player
    declare arena: Arena
    declare enemyManager: EnemyManager


    constructor() {
        super("gameScene")
    }

    preload() {
        this.load.image("playerShip", playerShip)
        this.load.spritesheet("enemies", enemies, {frameWidth: 32,frameHeight:32})
    }

    create() {
        this.input.setPollAlways()

        this.arena = new Arena(this.matter.scene, 0,0)
        this.player = new Player(this.matter.world, 50,50)

        /*let a = this.matter.add.polygon(200, 150, 3, 40, {
            scale: new Vector2(2,100)
        })*/

        this.enemyManager = new EnemyManager(this.matter.scene)
        this.enemyManager.newWave(this.arena.getTiles())

        this.cameras.main.startFollow(this.player.getPlayer())

        this.events.on("waveEnded", () => {
            //this.enemyManager.newWave(this.arena.getTiles())
            //this.cameras.main.stopFollow()
            //this.cameras.main.setOrigin(0,0)
            this.cameras.main.setZoom(0.5,0.5)
            //this.cameras.main.setPosition(0,0)
        })
    }

    update() {
        this.player.update()
        //console.log(EnemyManager.getInstance().getEnemiesLeft())
    }
}