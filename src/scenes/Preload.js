import bg from '../assets/images/backgrounds/background.jpg';
import bgScore from '../assets/images/bg-score.png';
import timeUp from '../assets/images/text-timeup.png';
import logo from '../assets/images/donuts_logo.png';
import bigDonut from '../assets/images/donut.png';
import bigDonutShadow from '../assets/images/big-shadow.png';
import play from '../assets/images/btn-play.png';

import gems from '../assets/donuts'
import point from '../assets/images/particles/particle_ex1.png'
import shadow from '../assets/images/game/shadow.png'
import gridConfig from '../assets/gridConfig'

const Preload = class Preload {
    constructor() {
        this.loadComplete = false;
    }
    create() {
        this.load.onLoadComplete.addOnce(this.onLoadComplete, this);
        this.load.image('bg', bg);
        this.load.image('shadow', shadow);
        this.load.image('bg-score', bgScore);
        this.load.image('point', point);
        this.load.image('time-up', timeUp);
        this.load.image('donuts-logo', logo);
        this.load.image('donut', bigDonut);
        this.load.image('big-shadow', bigDonutShadow);
        this.load.image('play', play);

        for (let gem in gems) {
            this.load.image('gem-0' + gem, gems[gem])
            gridConfig.images.push('gem-0' + gem)
        }

        this.load.start();
    }

    update() {
     if (this.loadComplete)
          this.game.state.start('start-screen');
      }

    onLoadComplete() {
        this.loadComplete = true;
    }
}

export default Preload