import {Zombie} from "../entities/enemies/Zombie"
import {EnemyManager} from "../entities/enemies/EnemyManager"

export class Arena {
    private scene: Phaser.Scene
    private arenaBounds: MatterJS.BodyType[]
    private maps: string[]
    private arenaTiles: Phaser.GameObjects.Rectangle[]

    constructor(scene: Phaser.Scene, x: number, y: number) {
        this.scene = scene
        this.maps = JSON.parse(localStorage.getItem("maps") ?? "[]")
        this.arenaTiles = []

        for (let i = 0; i < 16; i++) {
            for (let j = 0; j < 16; j++) {
                this.arenaTiles.push(scene.add.rectangle(
                    x + i * 80,
                    y + j * 80,
                    80,
                    80,
                    0xeeeeee
                ))
            }
        }

        this.newMap()

        this.arenaBounds = [
            scene.matter.add.rectangle(x + 600, y - 46, 1300, 10, {
                isStatic: true,
                label: "wall"
            }),
            scene.matter.add.rectangle(x - 45, y + 600, 10, 1280, {
                isStatic: true,
                label: "wall"
            }),
            scene.matter.add.rectangle(x + 600, y + 1245, 1300, 10, {
                isStatic: true,
                label: "wall"
            }),
            scene.matter.add.rectangle(x + 1245, y + 600, 10, 1280, {
                isStatic: true,
                label: "wall"
            }),
        ]



        /*new Zombie(this.scene.matter.world, 300, 300)
        new Zombie(this.scene.matter.world, 400, 300)
        new Zombie(this.scene.matter.world, 500, 300)
        new Zombie(this.scene.matter.world, 600, 300)
        new Zombie(this.scene.matter.world, 700, 300)
        new Zombie(this.scene.matter.world, 800, 300)*/
    }

    private newMap() {
        const map = this.maps[
            Math.floor(Math.random() * this.maps.length)
            ]

        for (let i = 0; i < 256; i++) {
            this.arenaTiles[i].setFillStyle(
                map[i] === '0'
                    ? 0xeeeeee
                    : 0x666666
            )

            if (map[i] === '1') {
                this.scene.matter.add.gameObject(this.arenaTiles[i], {
                    isStatic: true,
                    label: "wall"
                })
            } else {
                this.scene.matter.world.remove(this.arenaTiles[i])
            }
        }
        //Math.random() < 0.5 ? 0x666666 : 0xeeeeee
    }

    public getTiles() {
        return this.arenaTiles
    }
}