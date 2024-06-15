import {BaseWeapon} from "@/game/items/weapons/BaseWeapon"
import Phaser from "phaser"
import {Bullet} from "@/game/items/weapons/projectiles/Bullet"

export class AssaultRifle extends BaseWeapon {
    private firingController
    
    constructor(scene: Phaser.Scene, _parent: Phaser.Physics.Matter.Image) {
        super(scene, _parent,"rocketLauncher", 100)

        this.firingController = scene.time.addEvent({
            delay: 250,
            startAt: 250,
            repeat: -1,
            callback: () => {this.fire()},
            paused: true
        })
        
        this.scene.input.on('pointerdown', () => {
            this.firingController.paused = false
        })

        this.scene.input.on('pointerup', () => {
            this.firingController.paused = true
        })
    }
    
    altFire(): void {
    }

    fire(): void {
        if(this.recharging) return

        const target = {
            x: this.scene.input.activePointer.x + this.scene.cameras.main.scrollX,
            y: this.scene.input.activePointer.y + this.scene.cameras.main.scrollY
        }
        new Bullet(this.scene, this.weapon.x,this.weapon.y,target.x,target.y)
        this.reload()
    }
}