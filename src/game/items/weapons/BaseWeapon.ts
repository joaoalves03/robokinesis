import Phaser from "phaser";

export abstract class BaseWeapon extends Phaser.GameObjects.GameObjectFactory {
    weapon: Phaser.GameObjects.Image
    parent: Phaser.Physics.Matter.Image
    mouseAngle: number = 0
    fireRate: number
    recharging: boolean = false
    disabled: boolean = false

    abstract fire(): void
    abstract altFire(): void

    protected constructor(
            scene: Phaser.Scene,
            _parent: Phaser.Physics.Matter.Image,
            texture: string | Phaser.Textures.Texture,
            firingDelay: number
    ) {
        super(scene)
        this.weapon = this.scene.add.image(_parent.x, _parent.y, texture)
        this.parent = _parent
        this.fireRate = firingDelay

        this.scene.input.on('pointermove', (pointer: { x: number; y: number; }) => {
            this.mouseAngle = Phaser.Math.Angle.Between(
                this.parent.x,
                this.parent.y,
                pointer.x + this.scene.cameras.main.scrollX,
                pointer.y + this.scene.cameras.main.scrollY
            )
        }, this);
    }

    update() {
        this.weapon.setPosition(
            this.parent.x + this.calculateOffset() * Math.cos(this.mouseAngle),
            this.parent.y + this.calculateOffset() * Math.sin(this.mouseAngle)
        )
        this.weapon.setRotation(this.mouseAngle)
        this.weapon.setFlipY(this.mouseAngle > Math.PI / 2 || this.mouseAngle < Math.PI / 2 * -1)
    }

    calculateOffset(){
        return (this.weapon.displayWidth/2) + this.weapon.displayWidth;
    }
    
    reload() {
        if(this.recharging) return

        this.recharging = true

        this.scene.time.addEvent({
            callback: () => {this.recharging = false},
            delay: this.fireRate
        })
    }
    
    enable() {
        this.weapon.setAlpha(1)
        this.disabled = false
    }
    
    disable() {
        this.weapon.setAlpha(0)
        this.disabled = true
    }
}