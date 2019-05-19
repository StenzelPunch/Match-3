import gridConfig from '../assets/gridConfig'
import GemGrid from '../assets/GemsGrid'


const Game = class Game {
    constructor() {
        this.playClicked = false
    }
    create() {
        const background = this.add.sprite(gridConfig.gameWidth / 2, gridConfig.gameHeight / 2, 'bg');
        background.height = gridConfig.gameHeight;
        background.scale.x = background.scale.y
        background.anchor.set(0.5)
        const logo = this.add.sprite(gridConfig.gameWidth / 2, gridConfig.gameHeight / 8, 'donuts-logo')
        logo.anchor.set(0.5)
        logo.scale.setTo(0.5)
        const bigDonutShadow = this.add.sprite(gridConfig.gameWidth / 2 + 10, gridConfig.gameHeight / 2 + 10, 'big-shadow')
        bigDonutShadow.anchor.set(0.5)
        bigDonutShadow.scale.setTo(0.6)
        const bigDonut = this.add.sprite(gridConfig.gameWidth / 2, gridConfig.gameHeight / 2, 'donut')
        bigDonut.anchor.set(0.5)
        bigDonut.scale.setTo(0.6)
        const play = this.add.sprite(gridConfig.gameWidth / 2, gridConfig.gameHeight - gridConfig.gameHeight / 8 , 'play')
        play.anchor.set(0.5)
        play.scale.setTo(0.7)
        play.inputEnabled = true;
        play.events.onInputDown.add(this.clickHandler, this)
    }
    update() {
        if (this.playClicked) {
            this.state.start('game')
            this.playClicked = false
        }
    }
    clickHandler() {
        this.playClicked = true
    }

}

export default Game
