import gridConfig from '../assets/gridConfig'

const Game = class Game {
    constructor() {
        this.playClicked = false
    }
    create() {
        const background = this.add.sprite(gridConfig.gameWidth / 2, gridConfig.gameHeight / 2, 'background');
        background.height = gridConfig.gameHeight;
        background.scale.x = background.scale.y
        background.anchor.set(0.5)

        const logo = this.add.sprite(gridConfig.gameWidth / 2, gridConfig.gameHeight / 8, 'donuts_logo')
        logo.anchor.set(0.5)
        logo.scale.setTo(0.5)

        const bigDonutShadow = this.add.sprite(gridConfig.gameWidth / 2 + 10, gridConfig.gameHeight / 2 + 10, 'big_shadow')
        bigDonutShadow.anchor.set(0.5)
        bigDonutShadow.scale.setTo(0.4)

        const bigDonut = this.add.sprite(gridConfig.gameWidth / 2, gridConfig.gameHeight / 2, 'donut')
        bigDonut.anchor.set(0.5)
        bigDonut.scale.setTo(0.4)

        const play = this.add.sprite(gridConfig.gameWidth / 2, gridConfig.gameHeight - gridConfig.gameHeight / 8 , 'btn_play')
        play.anchor.set(0.5)
        play.scale.setTo(0.7)

        const musicBtn = this.add.sprite(40, gridConfig.gameHeight - gridConfig.gameHeight / 8 , 'btn_sfx')
        musicBtn.anchor.set(0.5)
        musicBtn.scale.setTo(0.5)
        musicBtn.inputEnabled = true;
        musicBtn.events.onInputDown.add(this.musicBtn, this)

        play.inputEnabled = true;
        play.events.onInputDown.add(this.clickHandler, this)
        const tweenPlay = this.add.tween(play).from( { alpha: 0 }, 700, Phaser.Easing.Linear.None)
        tweenPlay.start()
        const tweenLogo = this.add.tween(logo).from( { alpha: 0 }, 700, Phaser.Easing.Linear.None)
        tweenLogo.start()

        const music = this.add.audio('background');
        music.loopFull(1)
        music.play();
    }
    update() {
        if (this.playClicked) {
            this.state.start('tutorial')
            this.playClicked = false
        }
    }
    clickHandler() {
        this.playClicked = true
    }
    musicBtn(){
        this.game.sound.mute = !this.game.sound.mute
    }

}

export default Game
