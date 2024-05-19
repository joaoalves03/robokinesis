import {BaseWeapon} from "../../entities/weapons/BaseWeapon";
import Phaser from "phaser";
import {Bullet} from "./projectiles/Bullet";

export class Pistol extends BaseWeapon {
    constructor(scene: Phaser.Scene, _parent: Phaser.Physics.Matter.Image) {
        super(scene, _parent,"playerShip", 500)

        this.scene.input.on('pointerdown', () => {
            this.fire()
        })
    }

    fire(): void {
        if(this.recharging) return

        this.recharging = true

        this.scene.time.addEvent({
            callback: () => {this.recharging = false},
            delay: this.fireRate
        })

        const target = {
            x: this.scene.input.activePointer.x + this.scene.cameras.main.scrollX,
            y: this.scene.input.activePointer.y + this.scene.cameras.main.scrollY
        }
        new Bullet(this.scene, this.weapon.x,this.weapon.y,target.x,target.y)
    }

    altFire(): void {

    }
}