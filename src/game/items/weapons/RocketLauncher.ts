import {BaseWeapon} from "./BaseWeapon"
import Phaser from "phaser"
import {Missile} from "./projectiles/Missile"

export class RocketLauncher extends BaseWeapon {
    constructor(scene: Phaser.Scene, _parent: Phaser.Physics.Matter.Image) {
        super(scene, _parent,"rocketLauncher", 1000)

        this.scene.input.on('pointerdown', () => {
            this.fire()
        })
    }
    
    altFire(): void {
    }

    fire(): void {
        if(this.disabled || this.recharging) return
        
        const target = {
            x: this.scene.input.activePointer.x + this.scene.cameras.main.scrollX,
            y: this.scene.input.activePointer.y + this.scene.cameras.main.scrollY
        }
        
        new Missile(this.scene, this.weapon.x,this.weapon.y,target.x,target.y)
        this.reload()
    }
    
}