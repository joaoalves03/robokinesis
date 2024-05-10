export class MapEditorScene extends Phaser.Scene {
    private tiles: Phaser.GameObjects.Rectangle[]
    private tile_values: number[]

    constructor() {
        super("mapEditorScene")
        this.tiles = []
        this.tile_values = []
    }

    create() {
        const screenHeight = this.cameras.main.height
        const tileSize = screenHeight / 16
        const startPosition = (screenHeight / 2) - tileSize

        this.input.mouse!.disableContextMenu()

        // TODO: REPLACE WITH ACTUAL SAVING BUTTON
        this.input.keyboard!.on('keydown-S', () => {
            localStorage.setItem("maps", JSON.stringify([
                this.tile_values.join("")
            ]))
        }, this);

        for(let i = 0; i<16; i++) {
            for(let j = 0; j<16; j++) {
                this.tiles.push(this.add.rectangle(
                    startPosition + (j*tileSize),
                    (tileSize / 2) + (i*tileSize),
                    tileSize,
                    tileSize,
                    0xeeeeee
                ))
                this.tile_values.push(0)
            }
        }

        this.input.on("pointermove", (pointer: Phaser.Geom.Point) => {
            this.tiles.forEach((tile, index) => {
                if(Phaser.Geom.Rectangle.ContainsPoint(tile.getBounds(), pointer)) {
                    tile.setFillStyle(0x666666)
                } else {
                    if(this.tile_values[index] == 1)
                        tile.setFillStyle(0x666666)
                    else
                        tile.setFillStyle(0xeeeeee)
                }
            })
        })

        this.input.on("pointerdown", (pointer: Phaser.Input.Pointer) => {
            this.tiles.forEach((tile, index) => {
                if(Phaser.Geom.Rectangle.ContainsPoint(tile.getBounds(), new Phaser.Geom.Point(pointer.x, pointer.y))) {
                    this.tile_values[index] = pointer.rightButtonDown()
                        ? 0
                        : 1
                }
            })
        })
    }
}