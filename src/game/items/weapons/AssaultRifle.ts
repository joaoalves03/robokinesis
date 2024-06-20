import {BaseWeapon} from "@/game/items/weapons/BaseWeapon"
import Phaser from "phaser"
import {Bullet} from "@/game/items/weapons/projectiles/Bullet"

export class AssaultRifle extends BaseWeapon {
    private firingController
    
    constructor(scene: Phaser.Scene, _parent: Phaser.Physics.Matter.Image) {
        super(scene, _parent,"markII", 1)
        
        this.weapon.anims.create({
            key: 'idle',
            frames: this.scene.anims.generateFrameNumbers('markII', { start: 0, end: 3 }),
            frameRate: 5,
            repeat: -1
        })

        this.weapon.anims.create({
            key: 'fire',
            frames: this.scene.anims.generateFrameNumbers('markII', { start: 4, end: 7 }),
            frameRate: 12,
            repeat: -1
        })

        this.weapon.play("idle")
        
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
            this.weapon.play("idle", true)
            this.firingController.paused = true
        })
    }
    
    altFire(): void {
    }

    fire(): void {
        if(this.disabled || this.recharging) return

        this.weapon.play("fire", true)
        
        const target = {
            x: this.scene.input.activePointer.x + this.scene.cameras.main.scrollX,
            y: this.scene.input.activePointer.y + this.scene.cameras.main.scrollY
        }
        this.scene.sound.play("gun", {volume: 0.02})
        new Bullet(this.scene, this.weapon.x,this.weapon.y,target.x,target.y)
        this.reload()
    }
}