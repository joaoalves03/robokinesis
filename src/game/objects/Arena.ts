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
        
        if(this.maps.length == 0) {
            // Sacrifices had to be made, enjoy this binary map
            this.maps.push("0000000000000000000000000000000000010000000010000011000000001100000000000000000000000000000000000000000000000000000000011000000000000001100000000000000000000000000000000000000000000000000000000011000000001100000100000000100000000000000000000000000000000000")
        }
        
        const texture = this.scene.textures.get("ground_spots")
        
        for (let i = 0; i < 16; i++){
            for (let j = 0; j < 16; j++) {
                this.scene.add.image(i * 80,j * 80,"floor_tile")
                    .setDepth(2)
                
                if(Math.random() < 0.2) {
                    this.scene.add.sprite(
                        i * 80,j * 80,
                        "ground_spots", 
                        Phaser.Math.Between(0, texture.frameTotal - 2)
                    ).setDepth(3)
                }
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
                    this.arenaTiles.push(new Vector2((i-1)*80,(j-1)*80))
                }
                
            }
        }
    }
    
    public getTiles() {
        return this.arenaTiles
    }
}