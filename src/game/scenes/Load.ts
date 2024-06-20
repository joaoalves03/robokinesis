import eugene from '/assets/eugene.png'
import eugene_single from '/assets/eugene_single.png'
import enemies from '/assets/enemies.png'
import rocketLauncher from '/assets/weapons/rocketlauncher.png'
import shotgun from '/assets/weapons/ben.png'
import plasma from '/assets/projectiles/plasma.png'
import server from '/assets/objects/server.png'
import paul from '/assets/enemies/paul.png'
import fred from '/assets/enemies/fred.png'
import pogo from '/assets/enemies/pogo.png'
import floor_tile from '/assets/objects/floor_tile.png'
import ground_spots from '/assets/objects/ground_spots.png'
import {EventBus} from "@/game/EventBus"

export class LoadScene extends Phaser.Scene {
    constructor() {
        super("loadScene")
    }
    
    preload() {
        this.load.spritesheet("player", eugene, {
            frameWidth: 20,
            frameHeight: 32,
        })
        this.load.spritesheet("playerPieces", eugene_single, {
            frameWidth: 5,
            frameHeight: 8
        })
        this.load.spritesheet("plasma", plasma, {
            frameWidth: 16,
            frameHeight: 16,
        })
        this.load.spritesheet("server", server, {
            frameWidth: 68,
            frameHeight: 68
        })
        this.load.spritesheet("paul", paul, {
            frameWidth: 29,
            frameHeight: 28
        })
        this.load.spritesheet("shotgun", shotgun, {
            frameWidth: 16,
            frameHeight: 16
        })
        this.load.spritesheet("ground_spots", ground_spots, {
            frameWidth: 80,
            frameHeight: 80
        })
        this.load.spritesheet("fred", fred, {
            frameWidth: 32,
            frameHeight: 32
        })
        this.load.spritesheet("pogo", pogo, {
            frameWidth: 28,
            frameHeight: 28
        })
        this.load.image("rocketLauncher", rocketLauncher)
        this.load.image("floor_tile", floor_tile)

        this.load.spritesheet("enemies", enemies, {frameWidth: 32, frameHeight: 32})
        
        
        this.load.on("progress", (progress: number) => {
            EventBus.emit("loadProgress", progress)
        })
        this.load.on("complete", () => {
            EventBus.emit("goToMainMenu")
            EventBus.emit("game_goToMainMenu")
            this.scene.start("mainMenuScene")
        })
    }
}