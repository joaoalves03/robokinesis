import {BaseWeapon} from "@/game/items/weapons/BaseWeapon"
import Phaser from "phaser"
import {Plasma} from "@/game/items/weapons/projectiles/Plasma"

export class PlasmaGun extends BaseWeapon {
    plasma?: Plasma
    pointerMoveHandler
    
    constructor(scene: Phaser.Scene, _parent: Phaser.Physics.Matter.Image) {
        super(scene, _parent,"rocketLauncher", 1000)

        this.scene.input.on('pointerdown', () => {
            this.fire()
        })
        
        this.pointerMoveHandler = () => {
            if(this.plasma) {
                this.updatePosition()
            }
        }
    }
    
    updatePosition(){
        this.plasma!.updatePosition(
            this.weapon.x + 20 * Math.cos(this.mouseAngle),
            this.weapon.y + 20 * Math.sin(this.mouseAngle)
        )
    }

    altFire(): void {
    }

    fire(): void {
        if(this.disabled) return
        
        this.plasma = new Plasma(
            this.scene, 
            this.weapon.x + 20 * Math.cos(this.mouseAngle),
            this.weapon.y + 20 * Math.sin(this.mouseAngle)
        )

        this.scene.input.on("pointermove", this.pointerMoveHandler)
        
        const pointerUpHandler = () => {
            this.plasma!.release(
                this.scene.input.activePointer.x + this.scene.cameras.main.scrollX,
                this.scene.input.activePointer.y + this.scene.cameras.main.scrollY
            )
            this.reload()
            this.scene.input.off('pointerup', pointerUpHandler)
            this.scene.input.off('pointermove', this.pointerMoveHandler)
        }
        
        this.scene.input.on('pointerup', pointerUpHandler)
    }
}