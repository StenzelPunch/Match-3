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
    create() {
        const background = this.add.sprite(gridConfig.gameWidth / 2, gridConfig.gameHeight / 2, 'background');
        background.height = gridConfig.gameHeight;
        background.scale.set(gridConfig.scale * 2)
        background.anchor.set(0.5)

        this.grid = new GemGrid(this, gridConfig)
        this.timer = this.time.create(false)
        this.timeLeft = this.grid.timeLeft
        this.timer.loop(1000, this.updateTime, this);

        const textScore = this.add.text(10, 20, "Score: " + this.grid.score, this.style)
        const textTime =  this.add.text(10, 100, "Time left: " + this.timeLeft, this.style)

        console.log(textScore)
        textScore.setShadow(5, 5, 'rgba(0,0,0,0.5)', 10);
        textTime.setShadow(5, 5, 'rgba(0,0,0,0.5)', 10);
        textScore.scale.set(gridConfig.scale)
        textTime.scale.set(gridConfig.scale)
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
        if (this.timeLeft.t) {
            this.timeLeft.t--
        } else {
            this.timerStarted = false
            this.timeLeft.t = 10
            this.state.start('game-over', true, false, this.grid.score)
        }
    }
    folow(){
        if(this.grid.isLineStarted){
            const particle = this.add.sprite(this.input.x,this.input.y, 'particle_5')
            particle.anchor.set(0.5)
            particle.alpha = 0.5

            const particleTween = this.add.tween(particle.scale).to({x: 0, y: 0}, 700, "Quart.easeOut")
            particleTween.onComplete.add(() => {
                particle.destroy()

            })
            particleTween.start()

        }

    }
}

export default Game
