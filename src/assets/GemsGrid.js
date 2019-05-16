import SingleGem from './SingleGem'
// import gemsImages from './donuts'


export default class GemsGrid {
    constructor(game, state) {
        this.width = state.gridWidth;
        this.height = state.gridHeight;
        this.rows = state.rows;
        this.colls = state.colls;
        this.images = state.images;
        this.game = game;
        this.state = state;
        this.selectedGem = null;
        this.content = []

        for (let i = 0; i < this.rows; i++) {
            const coll = [];
            for (let j = 0; j < this.colls; j++) {

                const x = this.partWidth * j + 5
                const y = this.partHeight * i + 5 + this.state.topBarHeight
                // const shadow = this.game.add.sprite(x + 6, y + 6, 'shadow')
                const donut = this.game.add.sprite(x, y, this.images[randomInteger(0, 5)])
                const gemConfig = [
                    i,
                    j,
                    this.images[randomInteger(0, 5)],
                    this.partWidth,
                    this.partHeight,
                ]

                donut.data = new SingleGem (this.game, this.state, ...gemConfig);
                donut.scale.setTo(0.5 ,0.5);
                // shadow.scale.setTo(0.5, 0.5)
                donut.inputEnabled = true;
                donut.events.onInputDown.add(this.select, this)
                coll.push(donut);
            }
            this.content.push(coll);
        }
    }
    get partWidth() {
        return this.width / this.colls;
    }
    get partHeight() {
        return this.height / this.rows;
    }

    select(e) {
        const oldSprite = this.selectedGem ? this.selectedGem : null
        const oldPos    = oldSprite ? Object.assign({}, oldSprite.position) : null
        const oldData   = oldSprite ? Object.assign({}, oldSprite.data) : null

        const newSprite = e
        const newPos    = Object.assign({}, newSprite.position)
        const newData   = Object.assign({}, newSprite.data)


        if (!this.selectedGem) {
            this.selectedGem = e
        } else {
            oldSprite.position.x = newPos.x
            oldSprite.position.y = newPos.y
            newSprite.position.x = oldPos.x
            newSprite.position.y = oldPos.y

            oldSprite.data.row   = newData.row
            oldSprite.data.coll  = newData.coll
            newSprite.data.row   = oldData.row
            newSprite.data.coll  = oldData.coll

            this.content[oldData.row][oldData.coll] = newSprite;
            this.content[newData.row][newData.coll] = oldSprite;

            this.selectedGem = null;
        }
    }
}

function randomInteger(min, max) {
    var rand = min - 0.5 + Math.random() * (max - min + 1)
    rand = Math.round(rand);
    return rand;
  }
