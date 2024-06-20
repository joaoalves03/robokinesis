import {BaseWeapon} from "./BaseWeapon";
import Phaser from "phaser";
import {Bullet} from "./projectiles/Bullet";

export class Pistol extends BaseWeapon {
    constructor(scene: Phaser.Scene, _parent: Phaser.Physics.Matter.Image) {
        super(scene, _parent,"mark", 500)

        this.weapon.anims.create({
            key: 'idle',
            frames: this.scene.anims.generateFrameNumbers('mark', { start: 0, end: 3 }),
            frameRate: 5,
            repeat: -1
        })

        this.weapon.anims.create({
            key: 'fire',
            frames: this.scene.anims.generateFrameNumbers('mark', { start: 4, end: 6 }),
            frameRate: 12,
            repeat: 0
        })

        this.weapon.play("idle")
        
        this.scene.input.on('pointerdown', () => {
            this.fire()
        })
    }

    fire(): void {
        if(this.disabled || this.recharging) return

        this.weapon.play("fire", true)

        this.weapon.on("animationcomplete", () => {
            this.weapon.play("idle", true)
        })
        
        const target = {
            x: this.scene.input.activePointer.x + this.scene.cameras.main.scrollX,
            y: this.scene.input.activePointer.y + this.scene.cameras.main.scrollY
        }
        new Bullet(this.scene, this.weapon.x,this.weapon.y,target.x,target.y)
        this.reload()
    }

    altFire(): void {
    }
}