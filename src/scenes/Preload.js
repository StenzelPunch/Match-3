import assets from '../assets/'
import gridConfig from '../assets/gridConfig'

export default class Preloade {
    constructor(){
        this.loadComplete = false
        this.logoShown = false;

    }
    create(){
        this.logo_shown_timer = this.game.time.create(false);
        this.logo_shown_timer.add(3000, this.onLogoShown, this);
        this.logo_shown_timer.start();

        const background = this.add.sprite(gridConfig.gameWidth / 2, gridConfig.gameHeight / 2, 'background');
        background.height = gridConfig.gameHeight;
        background.scale.x = background.scale.y
        background.anchor.set(0.5)
        const bigDonutShadow = this.add.sprite(gridConfig.gameWidth / 2 + 10, gridConfig.gameHeight / 2 + 10, 'big_shadow')
        bigDonutShadow.anchor.set(0.5)
        bigDonutShadow.scale.setTo(0.4)
        const bigDonut = this.add.sprite(gridConfig.gameWidth / 2, gridConfig.gameHeight / 2, 'donut')
        bigDonut.anchor.set(0.5)
        bigDonut.scale.setTo(0.4)
        const tween = this.add.tween(bigDonut)
        .to( {y: 200}, 1000, Phaser.Easing.Back.InOut)
        .to( {y: 400}, 1000, Phaser.Easing.Back.InOut)
        .to( {y: gridConfig.gameHeight / 2}, 1000, Phaser.Easing.Back.InOut)
        tween.loop(true)
        tween.start()
        const tweenShadow = this.add.tween(bigDonutShadow)
        .to( {y: 210}, 1000, Phaser.Easing.Back.InOut)
        .to( {y: 410}, 1000, Phaser.Easing.Back.InOut)
        .to( {y: gridConfig.gameHeight / 2 + 10}, 1000, Phaser.Easing.Back.InOut)
        tweenShadow.loop(true)
        tweenShadow.start()



        this.load.onLoadComplete.addOnce(this.onLoadComplete, this);

        //load images
        for (const image in assets.images) {
            if (`${image}` !== 'donut' && `${image}` !== 'background' && `${image}` !== 'big_shadow') {
                this.load.image(`${image}`, assets.images[image])
            }
        }
        //load audio
        for (const audio in assets.audio) {
            this.load.audio(`${audio}`, assets.audio[audio])
        }
        this.load.start()
        console.log('STAGE: Preload')
    }
    update() {
        if (this.loadComplete && this.logoShown) {
            this.game.state.start('start-screen');
        }
    }
    onLoadComplete() {
        this.loadComplete = true;
    }
    onLogoShown() {
        this.logoShown = true;
      }
}