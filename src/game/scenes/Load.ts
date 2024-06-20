import eugene from '/assets/eugene.png'
import eugene_single from '/assets/eugene_single.png'
import shotgun from '/assets/weapons/ben.png'
import plasma from '/assets/projectiles/plasma.png'
import server from '/assets/objects/server.png'
import paul from '/assets/enemies/paul.png'
import hector from '/assets/enemies/hector.png'
import hectorInflate from '/assets/enemies/hectorInflate.png'
import fred from '/assets/enemies/fred.png'
import pogo from '/assets/enemies/pogo.png'
import may from '/assets/weapons/may.png'
import mark from '/assets/weapons/mark.png'
import markII from '/assets/weapons/markii.png'
import floor_tile from '/assets/objects/floor_tile.png'
import ground_spots from '/assets/objects/ground_spots.png'
import explosions from '/assets/objects/explosions.png'

import sfx_walk_heavy from '/assets/sfx/walk_heavy.wav'
import sfx_goat from '/assets/sfx/robot_goat.wav'
import sfx_gorilla from '/assets/sfx/gorilla_screech.wav'
import sfx_explosion_huge from '/assets/sfx/hector-explosion.wav'
import sfx_shotgun from '/assets/sfx/shotgun.wav'
import sfx_gun from '/assets/sfx/gun-shot.wav'
import sfx_rocketlauncher from '/assets/sfx/rocket-launcher.wav'
import sfx_explosion from '/assets/sfx/explosion.mp3'
import sfx_cannon from '/assets/sfx/cannon.mp3'
import sfx_frog from '/assets/sfx/frog.wav'
import sfx_eugene_death from '/assets/sfx/eugene-death.wav'

import music from '/assets/music.mp3'
import ambience from '/assets/ambience.wav'

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
        this.load.spritesheet("may", may, {
            frameWidth: 16,
            frameHeight: 16
        })
        this.load.spritesheet("mark", mark, {
            frameWidth: 16,
            frameHeight: 16
        })
        this.load.spritesheet("markII", markII, {
            frameWidth: 16,
            frameHeight: 16
        })
        this.load.spritesheet("hector", hector, {
            frameWidth: 32,
            frameHeight: 32
        })
        this.load.spritesheet("hectorInflate", hectorInflate, {
            frameWidth: 45,
            frameHeight: 60
        })
        this.load.spritesheet("explosions", explosions, {
            frameWidth: 32,
            frameHeight: 32
        })
        
        this.load.image("floor_tile", floor_tile)
        
        this.load.audio("walk_heavy", sfx_walk_heavy)
        this.load.audio("goat", sfx_goat)
        this.load.audio("gorilla", sfx_gorilla)
        this.load.audio("explosion_huge", sfx_explosion_huge)
        this.load.audio("shotgun", sfx_shotgun)
        this.load.audio("gun", sfx_gun)
        this.load.audio("rocketlauncher", sfx_rocketlauncher)
        this.load.audio("explosion", sfx_explosion)
        this.load.audio("cannon", sfx_cannon)
        this.load.audio("frog", sfx_frog)
        this.load.audio("eugene_death", sfx_eugene_death)
        
        this.load.audio("music", music)
        this.load.audio("ambience", ambience)
        
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