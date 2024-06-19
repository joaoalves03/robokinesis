import {EventBus} from "@/game/EventBus"

export class GameOverScene extends Phaser.Scene {
    explosionEffect: Phaser.GameObjects.Graphics
    radius: number
    
    constructor() {
        super("gameOverScene")
    }

    create() {
        const data: { x: number, y: number, frame: Phaser.Animations.AnimationFrame, flip: boolean } 
            = this.registry.get("playerPosition")
        
        const player = this.add.sprite(
            data.x,
            data.y,
            "player"
        ).setFlipX(data.flip)
        
        player.anims.setCurrentFrame(data.frame)
        
        this.cameras.main.setZoom(2, 2)
        this.cameras.main.startFollow(player)

        this.time.addEvent({
            delay: 1000,
            callback: () => {
                player.setAlpha(0)
                
                this.explosionEffect = this.add.graphics({ lineStyle: { width: 2, color: 0xffffff } })

                this.radius = 0
                
                this.tweens.add({
                    targets: this,
                    radius: 40,
                    duration: 500,
                    ease: 'Sine.easeInOut',
                    onUpdate: () => {
                        this.drawCircle(data.x, data.y);
                    }
                })

                this.tweens.add({
                    targets: this.explosionEffect,
                    alpha: 0,
                    duration: 500,
                    ease: 'Sine.easeInOut'
                })
                
                for(let i = 0; i < 16; i++) {
                    const emitter = this.add.particles(data.x, data.y, 'playerPieces', {
                        frame: i,
                        lifespan: 4000,
                        speed: {min: 100, max: 200},
                        scale: {start: 0.8, end: 0},
                        gravityY: 150,
                        blendMode: 'ADD',
                        emitting: false
                    })

                    emitter.explode(1)
                }
            }
        })

        this.time.addEvent({
            delay: 3000,
            callback: () => {
                EventBus.emit("showGameOverScreen")
            }
        })
    }

    drawCircle(x: number, y: number) {
        this.explosionEffect.clear()
        this.explosionEffect.lineStyle(2, 0xffffff, 1)
        this.explosionEffect.strokeCircle(x, y, this.radius)
    }
}