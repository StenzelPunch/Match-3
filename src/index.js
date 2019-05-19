window.PIXI   = require('phaser-ce/build/custom/pixi');
window.p2     = require('phaser-ce/build/custom/p2');
window.Phaser = require('phaser-ce/build/custom/phaser-split');

import bg from './assets/images/backgrounds/background.jpg';
import gems from './assets/donuts'
import point from './assets/images/particles/particle_ex1.png'
import shadow from './assets/images/game/shadow.png'
import GemGrid from './assets/GemsGrid'

const Width = 480;
const Height = 720;
const TopBarHeight = 120;

const game = new Phaser.Game(Width, Height, Phaser.AUTO, '', { preload: preload, create: create, update: update });
const state = new Phaser.StateManager(game)

const gemsImaegs = []

state.rows = 7;
state.cols = 7;
state.images = gemsImaegs;
state.topBarHeight = TopBarHeight;
state.gridWidth = Width;
state.gridHeight = Height - TopBarHeight;
state.selectedGem = null;


function preload() {
    game.load.image('bg', bg);
    game.load.image('shadow', shadow);
    game.load.image('point', point);

    for (let gem in gems) {
        game.load.image('gem-0' + gem, gems[gem])
        gemsImaegs.push('gem-0' + gem)
    }

}

function create() {
    const background = game.add.sprite(Width, TopBarHeight, 'bg');

    background.scale.setTo(0.61, 0.67);
    background.angle += 90;
    const grid = new GemGrid(game, state)
    state.grid = grid;
    // grid.searchMatch()
}

function update() {
    // state.grid.loop()
}
