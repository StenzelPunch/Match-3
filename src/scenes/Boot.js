import donut from '../assets/images/donut.png'
import big_shadow from '../assets/images/big-shadow.png'
import background from '../assets/images/backgrounds/background.jpg'

export default class Boot {
    preload(){
        this.load.image('donut', donut)
        this.load.image('big_shadow', big_shadow)
        this.load.image('background', background)
    }
    create() {
        this.state.start('preload')
    }
}