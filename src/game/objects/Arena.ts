import {Zombie} from "../entities/enemies/Zombie"
import {EnemyManager} from "../entities/enemies/EnemyManager"
import EasyStar from "easystarjs"
import type {BaseEnemy} from "@/game/entities/enemies/BaseEnemy"
import type {Player} from "@/game/entities/Player"

export class Arena {
    private scene: Phaser.Scene
    private arenaBounds: MatterJS.BodyType[]
    private maps: string[]
    private arenaTiles: Phaser.GameObjects.Rectangle[][]
    private pathfinder = new EasyStar.js()

    constructor(scene: Phaser.Scene, x: number, y: number) {
        this.scene = scene
        this.maps = JSON.parse(localStorage.getItem("maps") ?? "[]")
        this.arenaTiles = []

        for (let i = 0; i < 16; i++) {
            const arr = []

            for (let j = 0; j < 16; j++) {
                arr.push(scene.add.rectangle(
                    x + i * 80,
                    y + j * 80,
                    80,
                    80,
                    0xeeeeee
                ))
            }

            this.arenaTiles.push(arr)
        }

        this.newMap()

        this.arenaBounds = [
            scene.matter.add.rectangle(x + 600, y - 540, 3280, 1000, {
                isStatic: true,
                label: "wall"
            }),
            scene.matter.add.rectangle(x - 540, y + 600, 1000, 1300, {
                isStatic: true,
                label: "wall"
            }),
            scene.matter.add.rectangle(x + 600, y + 1740, 3280, 1000, {
                isStatic: true,
                label: "wall"
            }),
            scene.matter.add.rectangle(x + 1740, y + 600, 1000, 1280, {
                isStatic: true,
                label: "wall"
            }),
        ]

        this.pathfinder.setAcceptableTiles(0)
        this.pathfinder.enableDiagonals()
        this.pathfinder.setIterationsPerCalculation(1000)
    }

    private newMap() {
        const map = this.maps[
            Math.floor(Math.random() * this.maps.length)
            ]

        for (let i = 0; i < 16; i++) {
            for (let j = 0; j < 16; j++) {
                this.arenaTiles[i][j].setFillStyle(
                    map[i] === '0'
                        ? 0xeeeeee
                        : 0x666666
                )

                if (map[i][j] === '1') {
                    this.scene.matter.add.gameObject(this.arenaTiles[i][j], {
                        isStatic: true,
                        label: "wall"
                    })
                } else {
                    this.scene.matter.world.remove(this.arenaTiles[i][j])
                }
            }
        }

        this.pathfinder.setGrid(
            this.arenaTiles
                .map(x => x
                    .map(y => y.fillColor == 0xeeeeee ? 0 : 1)
                )
        )
    }

    public findPath() {
        this.pathfinder.findPath(0, 0, 4, 4, (path) => {
            console.log(path)
        })
        this.pathfinder.calculate()
    }
    
    public getTiles() {
        return this.arenaTiles
    }
}