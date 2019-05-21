window.PIXI   = require('phaser-ce/build/custom/pixi');
window.p2     = require('phaser-ce/build/custom/p2');
window.Phaser = require('phaser-ce/build/custom/phaser-split');

import gridConfig from './assets/gridConfig'


import Preload from './scenes/Preload'
import Boot from './scenes/Boot'
import StartScreen from './scenes/StartScreen'
import Game from './scenes/Game'
import GameOver from './scenes/GameOver'


let Width = 640,
    Height = 860

if (window.innerWidth < 640) {
  Width = window.innerWidth
}
if (window.innerHeight < 860) {
  Height = window.innerHeight
}

const game = new Phaser.Game(Width, Height, Phaser.CANVAS, '');

WebFont.load({
    google: {
      families: ['Fredoka One']
    }
});

gridConfig.rows = 7;
gridConfig.cols = 7;
gridConfig.gameWidth = Width;
gridConfig.gameHeight = Height;
gridConfig.gridWidth = Width;
gridConfig.gridHeight = Height -  Height * .25;
gridConfig.topBarHeight =  Height * .25;
gridConfig.selectedGem = null;
gridConfig.game = game


if (Width == 640 && Height == 860) {
  gridConfig.scale = 1
} else {
  gridConfig.scale = window.devicePixelRatio * 0.2

}
game.state.add('boot', Boot);
game.state.add('preload', Preload);
game.state.add('start-screen', StartScreen);
game.state.add('game', Game);
game.state.add('game-over', GameOver);

game.state.start('boot');
