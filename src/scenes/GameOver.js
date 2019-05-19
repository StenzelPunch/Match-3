import gridConfig from '../assets/gridConfig'
import GemGrid from '../assets/GemsGrid'


const Game = class Game {
    constructor() {
        this.playClicked = false
        this.score = null
        this.style = { font: "50px Fredoka One", fill: "#fff", align: 'center'}
    }
    init(score) {
        this.score = score
    }
    create() {
        const background = this.add.sprite(gridConfig.gameWidth / 2, gridConfig.gameHeight / 2, 'bg');
        background.height = gridConfig.gameHeight;
        background.scale.x = background.scale.y
        background.anchor.set(0.5)
        const logo = this.add.sprite(gridConfig.gameWidth / 2, gridConfig.gameHeight / 12, 'donuts-logo')
        logo.anchor.set(0.5)
        logo.scale.setTo(0.3)
        const timeUp = this.add.sprite(gridConfig.gameWidth / 2 , gridConfig.gameHeight / 4, 'time-up')
        timeUp.anchor.set(0.5)
        timeUp.scale.setTo(0.8)
        const bgScore = this.add.sprite(gridConfig.gameWidth / 2 + 10, gridConfig.gameHeight / 2, 'bg-score')
        bgScore.anchor.set(0.5)
        bgScore.scale.setTo(0.8)
        const scoreText = this.add.text(gridConfig.gameWidth / 2 + 10, gridConfig.gameHeight / 2 - 10, this.score, this.style)
        scoreText.anchor.set(0.5)
        const play = this.add.sprite(gridConfig.gameWidth / 2, gridConfig.gameHeight - gridConfig.gameHeight / 4 , 'play')
        play.anchor.set(0.5)
        play.scale.setTo(0.7)
        play.inputEnabled = true;
        play.events.onInputDown.add(this.clickHandler, this)

        console.log(this)
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
