import type {BaseWeapon} from "@/game/items/weapons/BaseWeapon";
import {EventBus} from "../EventBus"

export class Player extends Phaser.Physics.Matter.Factory {
    declare cursors: Phaser.Types.Input.Keyboard.CursorKeys
    private readonly player: Phaser.Physics.Matter.Sprite
    private keyboard: Phaser.Input.Keyboard.KeyboardPlugin | null
    private weapon?: BaseWeapon
    private health: number = 100
    private lookingUp: boolean = false

    constructor(world: Phaser.Physics.Matter.World, x: number, y: number) {
        super(world)

        this.player = this.scene.matter.add.sprite(x, y, 'player', 0, {
            label: "player"
        })
        //this.weapon = new RocketLauncher(this.scene, this.player)
        this.player.setFixedRotation()
        this.player.setDepth(5)
        this.keyboard = this.scene.input.keyboard;
        
        this.createAnimations()
        this.player.play("idleDown")
        
        EventBus.on("damagePlayer", (damage: number) => {
            this.takeDamage(damage)
        })
    }
    
    createAnimations() {
        this.player.anims.create({
            key: 'idleDown',
            frames: this.scene.anims.generateFrameNumbers('player', { start: 0, end: 2 }),
            frameRate: 5,
            repeat: -1
        })

        this.player.anims.create({
            key: 'idleUp',
            frames: this.scene.anims.generateFrameNumbers('player', { start: 8, end: 10 }),
            frameRate: 5,
            repeat: -1
        })

        this.player.anims.create({
            key: 'walkingDown',
            frames: this.scene.anims.generateFrameNumbers('player', { start: 16, end: 23 }),
            frameRate: 10,
            repeat: -1
        })

        this.player.anims.create({
            key: 'walkingUp',
            frames: this.scene.anims.generateFrameNumbers('player', { start: 24, end: 31 }),
            frameRate: 10,
            repeat: -1
        })
    }

    update() {
        if(this.weapon != undefined)
            this.weapon.update()

        this.lookingUp = this.scene.game.input.mousePointer!.y < this.scene.sys.game.canvas.height / 2
        this.player.setFlipX(this.scene.game.input.mousePointer!.x < this.scene.sys.game.canvas.width / 2)
        
        // Player movement
        if (this.keyboard!.addKey('A').isDown) {
            this.player.setVelocityX(-2);
        } else if (this.keyboard!.addKey('D').isDown) {
            this.player.setVelocityX(2);
        } else {
            this.player.setVelocityX(0)
        }

        if (this.keyboard!.addKey('W').isDown) {
            this.player.setVelocityY(-2);
        } else if (this.keyboard!.addKey('S').isDown) {
            this.player.setVelocityY(2);
        } else {
            this.player.setVelocityY(0)
        }
        
        if(this.player.getVelocity().x == 0 && this.player.getVelocity().y == 0) {
            if(this.lookingUp) {
                this.player.play("idleUp", true)
            } else {
                this.player.play("idleDown", true)
            }
        } else {
            this.player.play(
                this.lookingUp ? "walkingUp" : "walkingDown",
                true
            )
        }
        
        if(this.player.x < -200) this.player.setPosition(-30)
        else if(this.player.x > 1300) this.player.setPosition(1224)
        if(this.player.y < -200) this.player.setPosition(this.player.x, -24)
        else if(this.player.y > 1300) this.player.setPosition(1224)
    }

    getPlayer() {
        return this.player
    }
    
    setHealth(n: number) {
        this.health = n
        EventBus.emit("updateHP", this.health)
    }
    
    takeDamage(n: number) {
        if(this.health == 0) return
        
        this.setHealth(Math.max(0, this.health - n))
        
        if(this.health == 0) this.die()
    }
    
    die() {
        EventBus.emit("playerDeath")
    }
    
    setWeapon(weapon: BaseWeapon | undefined) {
        this.weapon = weapon
    }
}