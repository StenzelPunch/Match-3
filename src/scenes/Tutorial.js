import gridConfig from '../assets/gridConfig'

export default class Tutorial {
    constructor(){
        this.lineToDestroy = []
        this.line = []
        this.isLineStart = false
        this.showFinger = true
    }
    create() {
        const background = this.add.sprite(gridConfig.gameWidth / 2, gridConfig.gameHeight / 2, 'background');
        background.height = gridConfig.gameHeight;
        background.scale.x = background.scale.y
        background.anchor.set(0.5)

        const play = this.add.sprite(gridConfig.gameWidth / 2, gridConfig.gameHeight - gridConfig.gameHeight / 10 , 'btn_play')
        play.anchor.set(0.5)
        play.scale.setTo(0.7)
        play.inputEnabled = true;
        play.events.onInputDown.add(this.clickHandler, this)

        const musicBtn = this.add.sprite(40, gridConfig.gameHeight - gridConfig.gameHeight / 8 , 'btn_sfx')
        musicBtn.anchor.set(0.5)
        musicBtn.scale.setTo(0.5)
        musicBtn.inputEnabled = true;
        musicBtn.events.onInputDown.add(this.musicBtn, this)

        const tW = gridConfig.gameWidth  / 7
        const tH = ((gridConfig.gameHeight / 3 )/ 4 )
        const mT = gridConfig.gameHeight / 10;

        const tutorial_background = this.add.sprite(tW - 10 , tH , 'tutorial_background');
        tutorial_background.width = gridConfig.gameWidth - tW * 2 + 20;
        tutorial_background.height = tutorial_background.width * 0.9

        const tutorial_text_top = this.add.text(gridConfig.gameWidth / 2, 10, 'How to play', { font: "40px Fredoka One", fill: "#fff", align: 'center'})
        const tutorial_text = this.add.text(gridConfig.gameWidth / 2, gridConfig.gameHeight / 2, 'Swipe 3 or more matching\n donuts, then let go to pop!', { font: "24px Fredoka One", fill: "#fff", align: 'center'})
        tutorial_text_top.anchor.set(.5, 0)
        tutorial_text_top.stroke = '#000000';
        tutorial_text_top.strokeThickness = 4;

        tutorial_text.anchor.set(.5, 0)
        tutorial_text.stroke = '#000000';
        tutorial_text.strokeThickness = 4;

        const tutuorialGems = [['gem_03', 'gem_03', 'gem_05', 'gem_06', 'gem_01'],
                               ['gem_06', 'gem_06', 'gem_04', 'gem_01', 'gem_04'],
                               ['gem_03', 'gem_02', 'gem_05', 'gem_01', 'gem_03'],
                               ['gem_04', 'gem_06', 'gem_03', 'gem_01', 'gem_05']]




        for (let row in tutuorialGems) {
            for (let col in tutuorialGems[row]) {
                const shadow = this.add.sprite(tW * col + tW + tW / 2 + 5, tH * row + tH / 2  + mT + 5, 'shadow')
                shadow.width = gridConfig.gameWidth / gridConfig.rows + 5;
                shadow.scale.y = shadow.scale.x
                shadow.anchor.set(0.5)
                const gem = this.add.sprite(tW * col + tW + tW / 2, tH * row + tH / 2 + mT , tutuorialGems[row][col])
                gem.width = gridConfig.gameWidth / gridConfig.rows + 5;
                gem.shadow = shadow
                gem.scale.y = gem.scale.x
                gem.anchor.set(0.5)
                if ( tutuorialGems[row][col] == 'gem_01' ){
                    // console.log(2)
                    gem.inputEnabled = true
                    this.line.push({x: gem.position.x, y: gem.position.y})
                    gem.events.onInputDown.add(this.inputDown, this)
                    gem.events.onInputOver.add(this.inputOver, this)
                    gem.events.onInputUp.add(this.inputUp, this)
                }
            }
        }

        const finger = this.add.sprite(this.line[0].x, this.line[0].y, 'hand')
        const tweenfinger = this.add.tween(finger)
        .to( {x: this.line[0].x, y: this.line[0].y}, 300, 'Linear')
        .to( {x: this.line[1].x, y: this.line[1].y}, 300, 'Linear')
        .to( {x: this.line[2].x, y: this.line[2].y}, 300, 'Linear')
        .to( {x: this.line[3].x, y: this.line[3].y}, 300, 'Linear')
        tweenfinger.loop(true)
        tweenfinger.start()
    }
    inputDown(e){
        this.isLineStart = true
        this.showFinger = false
        this.lineToDestroy.push(e)
        this.input.addMoveCallback(this.folow, this);
    }
    inputOver(e) {
        if (this.isLineStart) {
            this.lineToDestroy.push(e)
            this.game.add.sound(`select_${this.lineToDestroy.length}`).play()
        }
    }
    inputUp() {
        this.isLineStart = false
        if (this.lineToDestroy.length >= 3) {
            this.lineToDestroy.forEach(sprite => {
                const tween = this.add.tween(sprite.scale).to({ x: 0, y: 0}, 300, "Quart.easeOut")
                const tween1 = this.add.tween(sprite.shadow.scale).to({ x: 0, y: 0}, 300, "Quart.easeOut")
                tween.start()
                tween.onComplete.add(this.swipeComplete, this)
                tween1.start()
                this.game.add.audio('kill').play()
            });
        }
    }
    swipeComplete() {
        this.state.start('game')
    }
    musicBtn() {
        this.game.sound.mute = !this.game.sound.mute
    }
    clickHandler() {
        this.state.start('game')
    }
    folow(){
        if(this.isLineStart){
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