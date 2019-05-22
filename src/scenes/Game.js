import gridConfig from '../assets/gridConfig'
import GemGrid from '../assets/GemsGrid'

const Game = class Game {
    constructor(){
        this.style = { font: "36px Fredoka One", fill: "#fff", align: 'center'}
        this.grid = null
        this.textScore = null
        this.textTime = null
        this.timeLeft = null
        this.timer = null
        this.timerStarted = false;
        this.isPulseText = false
    }
    create() {
        const background = this.add.sprite(gridConfig.gameWidth / 2, gridConfig.gameHeight / 2, 'background');
        background.height = gridConfig.gameHeight;
        background.scale.x = background.scale.y
        background.anchor.set(0.5)

        this.grid = new GemGrid(this, gridConfig)
        this.timer = this.time.create(false)
        this.timeLeft = this.grid.timeLeft
        this.timer.loop(1000, this.updateTime, this);

        const bgScore = this.add.sprite( -40, -10, 'bg_score')
        const textScore = this.add.text(20, 25, "" + this.grid.score, this.style)
        const textTime =  this.add.text(10, 100, "Time left: " + this.timeLeft, this.style)
        bgScore.scale.setTo(0.6)

        this.textScore = textScore
        this.textTime = textTime

        textTime.stroke = '#000000';
        textTime.strokeThickness = 4;

        const musicBtn = this.add.sprite(gridConfig.gameWidth - 50, 50, 'btn_sfx')
        musicBtn.anchor.set(0.5)
        musicBtn.scale.setTo(0.5)
        musicBtn.inputEnabled = true;
        musicBtn.events.onInputDown.add(this.musicBtn, this)
    }
    musicBtn() {
        this.game.sound.mute = !this.game.sound.mute
    }
    update() {
        if (!this.timerStarted) {
            this.timerStarted = true;
            this.timer.start()
        }
        this.textScore.text = "" + this.grid.score

        if (this.timeLeft.t >= 10) {
            this.textTime.fill = "#fff"
            this.textTime.text = "  Time left: " + this.timeLeft.t
        } else {
            if (!this.isPulseText) {
                this.isPulseText = true
                this.pulseText()
            }
            this.textTime.fill = "#f33"
            this.textTime.text = "  Time left: " + this.timeLeft.t
            }
    }
    updateTime(){
        if (this.timeLeft.t) {
            this.timeLeft.t--
        } else {
            this.timerStarted = false
            this.timeLeft.t = 45
            this.state.start('game-over', true, false, this.grid.score)
        }
    }
    pulseText(){
        this.isPulseText = true
        const tweenText = this.add.tween(this.textTime.scale)
            .to({x: 0.9, y: 0.9}, 400, "Quart.easeOut")
            .to({x: 1.1, y: 1.1}, 300, "Quart.easeOut")
            tweenText.loop(true)
            tweenText.start()
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
