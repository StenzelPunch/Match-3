import gridConfig from '../assets/gridConfig'
import GemGrid from '../assets/GemsGrid'

const Game = class Game {
    create() {
        const background = this.add.sprite(gridConfig.gameWidth / 2, gridConfig.gameHeight / 2, 'bg');
        background.height = gridConfig.gameHeight;
        console.log(background.height)
        background.scale.x = background.scale.y
        background.anchor.set(0.5)
        const grid = new GemGrid(this, gridConfig)
    }
    update() {

    }
}

export default Game
