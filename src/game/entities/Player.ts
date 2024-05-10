import {Pistol} from "../entities/weapons/Pistol";
import type {BaseWeapon} from "../entities/weapons/BaseWeapon";

export class Player extends Phaser.Physics.Matter.Factory {
    declare cursors: Phaser.Types.Input.Keyboard.CursorKeys
    private readonly player: Phaser.Physics.Matter.Image
    private keyboard: Phaser.Input.Keyboard.KeyboardPlugin | null;
    private weapon: BaseWeapon;

    constructor(world: Phaser.Physics.Matter.World, x: number, y: number) {
        super(world)

        this.player = this.scene.matter.add.image(x, y, 'playerShip', 0, {
            label: "player"
        })
        this.weapon = new Pistol(this.scene, this.player)

        this.keyboard = this.scene.input.keyboard;
    }

    update() {
        this.weapon.update()

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
    }

    getPlayer() {
        return this.player
    }
}