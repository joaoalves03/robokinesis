import {Server} from "@/game/objects/Server"
import Vector2 = Phaser.Math.Vector2

export class Arena {
    private scene: Phaser.Scene
    private arenaBounds: MatterJS.BodyType[]
    private maps: string[]
    private arenaTiles: (Phaser.GameObjects.Sprite | Vector2)[] = []

    constructor(scene: Phaser.Scene, x: number, y: number) {
        this.scene = scene
        this.maps = JSON.parse(localStorage.getItem("maps") ?? "[]")
        
        for (let i = 0; i < 16; i++){
            for (let j = 0; j < 16; j++) {
                this.scene.add.image(i * 80,j * 80,"floor_tile")
            }
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
    }

    newMap() {
        const map = this.maps[
            Math.floor(Math.random() * this.maps.length)
            ]

        this.arenaTiles.forEach(x => {
            if(!(x instanceof Vector2)) {
                x.destroy()
            }
        })
        
        this.arenaTiles = []
        
        for (let i = 1; i <= 16; i++) {
            for (let j = 1; j <= 16; j++) {
                if (map[(i*16) + j] === '1') {
                    const server = new Server(
                        this.scene,
                        i * 80,
                        j * 80
                    )
                    this.arenaTiles.push(server)
                    this.scene.matter.add.gameObject(server, {
                        isStatic: true,
                        label: "wall"
                    })
                } else {
                    this.arenaTiles.push(new Vector2(i*80,j*80))
                }
                
            }
        }
    }
    
    public getTiles() {
        return this.arenaTiles
    }
}