import assets from '../assets/'
import gridConfig from '../assets/gridConfig'

export default class Preloade {
    constructor(){
        this.loadComplete = false
    }
    create(){
        this.load.onLoadComplete.addOnce(this.onLoadComplete, this);
        //load images
        for (const image in assets.images) {
                this.load.image(`${image}`, assets.images[image])
        }
        //load audio
        for (const audio in assets.audio) {
            this.load.audio(`${audio}`, assets.audio[audio])
        }
        this.load.start()
        console.log('STAGE: Preload')
    }
    update() {
        if (this.loadComplete) {
            this.game.state.start('game');
        }
    }
    onLoadComplete() {
        this.loadComplete = true;
    }
}