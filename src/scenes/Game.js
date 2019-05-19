import gridConfig from '../assets/gridConfig'
import GemGrid from '../assets/GemsGrid'

const Game = class Game {
    constructor(){
        this.style = { font: "50px Fredoka One", fill: "#fff", align: 'center'}
        this.grid = null
        this.textScore = null
        this.textTime = null
        this.timeLeft = null
        this.timer = null
        this.timerStarted = false;
    }
    preload() {

    }
    create() {
        const background = this.add.sprite(gridConfig.gameWidth / 2, gridConfig.gameHeight / 2, 'bg');
        background.height = gridConfig.gameHeight;
        console.log(background.height)
        background.scale.x = background.scale.y
        background.anchor.set(0.5)

        this.grid = new GemGrid(this, gridConfig)
        this.timer = this.time.create(false)
        this.timeLeft = this.grid.timeLeft
        this.timer.loop(1000, this.updateTime, this);

        const textScore = this.add.text(-10, 20, "Score: " + this.grid.score, this.style)
        const textTime =  this.add.text(-10, 100, "Time left: " + this.timeLeft, this.style)

        console.log(textScore)
        textScore.setShadow(5, 5, 'rgba(0,0,0,0.5)', 10);
        textTime.setShadow(5, 5, 'rgba(0,0,0,0.5)', 10);
        textScore.stroke = '#000000'
        textTime.stroke = '#000000'
        textScore.strokeThickness = 4;
        textTime.strokeThickness = 4;
        textScore.padding.set(10,10)
        textTime.padding.set(10,10)

        this.textScore = textScore
        this.textTime = textTime
    }
    update() {
        if (!this.timerStarted) {
            this.timerStarted = true;
            this.timer.start()
        }
        this.textScore.text = "  Score: " + this.grid.score
        this.textTime.text = "  Time left: " + this.timeLeft.t
    }
    updateTime(){
        if (this.timeLeft) {
            this.timeLeft.t--
        } else {
            console.log('time left')
        }
    }
}

export default Game
