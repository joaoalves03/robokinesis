import {GameScene} from './scenes/Game';
import {AUTO, Game} from 'phaser';
import {MapEditorScene} from "./scenes/MapEditor"
import Center = Phaser.Scale.Center
import {LoadScene} from "@/game/scenes/Load"
import {MainMenuScene} from "@/game/scenes/MainMenuScene"
import {GameOverScene} from "@/game/scenes/GameOverScene"
import {PauseScene} from "@/game/scenes/PauseScene"

const config: Phaser.Types.Core.GameConfig = {
    type: AUTO,
    scale: {
        mode: Phaser.Scale.FIT,
        autoCenter: Center.CENTER_BOTH
    },
    width: 1280,
    height: 720,
    parent: 'game-container',
    pixelArt: true,
    backgroundColor: '#222',
    physics: {
        default: 'matter',
        matter: {
            gravity: {
                x: 0,
                y: 0
            },
            debug: false
        }
    },
    scene: [
        LoadScene,
        PauseScene,
        MainMenuScene,
        GameScene,
        GameOverScene,
        MapEditorScene
    ]
};

const StartGame = (parent: string) => {

    return new Game({ ...config, parent });

}

export default StartGame;
