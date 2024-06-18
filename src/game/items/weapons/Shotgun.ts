import {BaseWeapon} from "@/game/items/weapons/BaseWeapon"
import Phaser from "phaser"
import {Pellet} from "@/game/items/weapons/projectiles/Pellet"

export class Shotgun extends BaseWeapon {
    private cartridges: number = 2
    private readonly reloadTime = 2000

    constructor(scene: Phaser.Scene, _parent: Phaser.Physics.Matter.Image) {
        super(scene, _parent, "rocketLauncher", 2000)

        this.scene.input.on('pointerdown', (event: Phaser.Input.Pointer) => {
            if(event.rightButtonDown()) {
                this.altFire()
            } else {
                this.fire()
            }
        })
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

        const target = {
            x: this.scene.input.activePointer.x + this.scene.cameras.main.scrollX,
            y: this.scene.input.activePointer.y + this.scene.cameras.main.scrollY
        }

        for (let i = 0; i < 8; i++) {
            new Pellet(
                this.scene,
                Phaser.Math.Between(this.weapon.x - 8, this.weapon.x + 8),
                Phaser.Math.Between(this.weapon.y - 8, this.weapon.y + 8),
                target.x, target.y
            )
        }

        this.cartridges -= 1
        console.log(this.cartridges)
        if (this.cartridges == 0) {
            console.log("reload")
            this.reload()
            this.scene.time.addEvent({
                delay: this.reloadTime,
                callback: () => {
                    this.cartridges = 2
                }
            })
        }
    }
}