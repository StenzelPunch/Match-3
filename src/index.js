window.PIXI   = require('phaser-ce/build/custom/pixi');
window.p2     = require('phaser-ce/build/custom/p2');
window.Phaser = require('phaser-ce/build/custom/phaser-split');

import gridConfig from './assets/gridConfig'


import Boot from './scenes/Boot'
import Preload from './scenes/Preload'
import StartScreen from './scenes/StartScreen'
import Game from './scenes/Game'
import GameOver from './scenes/GameOver'


let Width
let Height

if (window.innerWidth > 480) {
    Width = 480
} else {
    Width = window.innerWidth
}
if (window.innerHeight > 960) {
    Height = 960
} else {
    Height = window.innerHeight
}

const TopBarHeight = Height * .25;
const gemsImaegs = []

const game = new Phaser.Game(Width, Height, Phaser.WEBGL, '');

gridConfig.rows = 7;
gridConfig.cols = 7;
gridConfig.images = gemsImaegs;
gridConfig.gameWidth = Width;
gridConfig.gameHeight = Height;
gridConfig.gridWidth = Width;
gridConfig.gridHeight = Height - TopBarHeight;
gridConfig.topBarHeight = TopBarHeight;
gridConfig.selectedGem = null;
gridConfig.game = game


game.state.add('preload', Preload);
game.state.add('start-screen', StartScreen);
game.state.add('game', Game);

game.state.start('preload');
