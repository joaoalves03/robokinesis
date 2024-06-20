import {BaseWeapon} from "@/game/items/weapons/BaseWeapon"
import Phaser from "phaser"
import {Pellet} from "@/game/items/weapons/projectiles/Pellet"

export class Shotgun extends BaseWeapon {
    private cartridges: number = 2
    private readonly reloadTime = 2000
    private sound

    constructor(scene: Phaser.Scene, _parent: Phaser.Physics.Matter.Image) {
        super(scene, _parent, "shotgun", 2000)

        this.sound = this.scene.sound.add("shotgun")
        this.sound.setVolume(0.04)
        
        this.scene.input.on('pointerdown', (event: Phaser.Input.Pointer) => {
            if(event.rightButtonDown()) {
                this.altFire()
            } else {
                this.fire()
            }
        })

        this.weapon.anims.create({
            key: 'idle',
            frames: this.scene.anims.generateFrameNumbers('shotgun', { start: 0, end: 3 }),
            frameRate: 5,
            repeat: -1
        })

        this.weapon.anims.create({
            key: 'fire',
            frames: this.scene.anims.generateFrameNumbers('shotgun', { start: 4, end: 7 }),
            frameRate: 12,
            repeat: 0
        })

        this.weapon.play("idle")

        // this.weapon.anims.create({
        //     key: 'idle',
        //     frames: this.scene.anims.generateFrameNumbers('shotgun', { start: 0, end: 4 }),
        //     frameRate: 5,
        //     repeat: -1
        // })
        //
        // this.weapon.anims.create({
        //     key: 'fire',
        //     frames: this.scene.anims.generateFrameNumbers('shotgun', { start: 5, end: 8 }),
        //     frameRate: 5,
        //     repeat: 0
        // })
        //
        // this.weapon.play("idle")
    }
    
    // Fire a shot that pushes everyone away
    // Unfinished
    altFire(): void {
        /*const target = {
            x: this.scene.input.activePointer.x + this.scene.cameras.main.scrollX,
            y: this.scene.input.activePointer.y + this.scene.cameras.main.scrollY
        }
        
        new KnockbackBomb(
            this.scene,
            this.weapon.x, this.weapon.y,
            target.x, target.y
        )*/
    }

    // Fire one of two cartridges
    // Only reload when both have been used
    fire(): void {
        if (this.disabled || this.cartridges == 0) return

        this.sound.play()
        this.weapon.play("fire", true)

        this.weapon.on("animationcomplete", () => {
            this.weapon.play("idle", true)
        })
        
        const target = {
            x: this.scene.input.activePointer.x + this.scene.cameras.main.scrollX,
            y: this.scene.input.activePointer.y + this.scene.cameras.main.scrollY
        }

        for (let i = 0; i < 6; i++) {
            new Pellet(
                this.scene,
                Phaser.Math.Between(this.weapon.x - 8, this.weapon.x + 8),
                Phaser.Math.Between(this.weapon.y - 8, this.weapon.y + 8),
                target.x, target.y
            )
        }

        this.cartridges -= 1
        if (this.cartridges == 0) {
            const reloadEffect = this.scene.add.tween({
                duration: 500,
                targets: this.weapon,
                alpha: 0.25,
                yoyo: true,
                repeat: -1,
                easing: 'Sine.easeInOut',
                onUpdate: () => {
                    if(this.disabled) this.weapon.alpha = 0
                }
            })
            
            reloadEffect.play()
            
            this.reload()
            this.scene.time.addEvent({
                delay: this.reloadTime,
                callback: () => {
                    reloadEffect.destroy()
                    this.cartridges = 2
                }
            })
        }
    }
}