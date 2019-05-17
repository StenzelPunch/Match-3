import SingleGem from './SingleGem'


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

    }
    get partWidth() {
        return this.width / this.colls;
    }
    get partHeight() {
        return this.height / this.rows;
    }
    generateElements() {
        for (let i = 0; i < this.rows; i++) {
            const coll = [];
            for (let j = 0; j < this.colls; j++) {

                const x = this.partWidth * j + this.partWidth / 2
                const y = this.partHeight * i  + this.partWidth / 2 + this.state.topBarHeight
                const imageNumber = this.game.rnd.integerInRange(0, 5)

                const shadow = this.game.add.sprite(x + 5, y + 5, 'shadow', 0)
                const donut = this.game.add.sprite(x, y, this.images[imageNumber])

                      shadow.scale.setTo(0.5 ,0.5);
                      shadow.anchor.set(0.5);

                const gemConfig = [
                    i,
                    j,
                    this.images[imageNumber],
                    this.partWidth,
                    this.partHeight,
                    shadow
                ]

                donut.data = new SingleGem (this.game, this.state, ...gemConfig);
                donut.scale.setTo(0.5 ,0.5);
                donut.anchor.set(0.5)
                donut.inputEnabled = true;
                donut.events.onInputDown.add(this.select, this)
                coll.push(donut);
            }
            this.content.push(coll);
        }
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
            changeScaleDonut(e, 0.6)
        } else if (doesRangeTooBig(this, oldSprite, newSprite)) {
            changeScaleDonut(this.selectedGem, 0.5)
            this.selectedGem = null
        } else if (this.selectedGem == e){
            changeScaleDonut(e, 0.5)
            this.selectedGem = null
        } else {
            oldSprite.data.row   = newData.row
            oldSprite.data.coll  = newData.coll
            newSprite.data.row   = oldData.row
            newSprite.data.coll  = oldData.coll

            this.content[oldData.row][oldData.coll] = newSprite;
            this.content[newData.row][newData.coll] = oldSprite;

            tweenDonut(oldSprite, newPos.x, newPos.y)
            tweenDonut(newSprite, oldPos.x, oldPos.y)

            changeScaleDonut(this.selectedGem, 0.5)

            this.selectedGem = null;

            this.searchMatch()


        }
    }
    searchMatch(){
        const array = this.content;
        const matches = []
        matches.push(...search(array), ...search(transpose(array)))
        matches.forEach(group => {
            group.forEach(sprite => {
                if (sprite.alive) {
                    this.searchAllUnderSprite(sprite)
                }
            })
        })
        return matches != [] ? matches : false
    }
    searchAllUnderSprite(sprite){
        const under = []
        for (let row in this.content) {
            if (row < sprite.data.row) {
                for (let coll in this.content[row]) {
                    if (coll == sprite.data.coll) {
                        if (this.content[row][coll].alive) {

                        }



                        // point.anchor.set(0.5)
                    }
                }
            }
        }
        this.delleteSprite(sprite)
        // console.log(under)
    }
    delleteSprite(sprite) {
        sprite.data.shadow.destroy()
        sprite.destroy()
    }
}

function doesRangeTooBig(state, oldPos, newPos){
    const newX = newPos.position.x,
          newY = newPos.position.y,
          oldX = oldPos.position.x,
          oldY = oldPos.position.y,
          gapX = state.partWidth,
          gapY = state.partHeight
    if (newX === oldX + gapX && newY === oldY || newX === oldX - gapX && newY === oldY ) {
       return false
    } else if (newY === oldY + gapY && newX === oldX || newY === oldY - gapY && newX === oldX ) {
        return false
    } else {
        return true
    }
}

const search = array => {
    const matches = []
    for (let row in array) {
        let bufer = []
        for (let coll in array[row]) {
            if (bufer.length > 0) {
                if (bufer[bufer.length - 1].key == array[row][coll].key) {
                    bufer.push(array[row][coll])
                    if (coll == array[row].length - 1 && bufer.length >= 3) {
                        matches.push(bufer)
                    }
                } else {
                    if (bufer.length >= 3) {
                        matches.push(bufer)
                    }
                    bufer = []
                    bufer.push(array[row][coll])
                }
            } else {
                bufer.push(array[row][coll])
            }
        }
        bufer = []
    }
    return matches;
}

const transpose = array => array[0].map((col, i) => array.map(row => row[i]));

const tweenDonut = (sprite, x, y) => {
    const tween = sprite.game.add.tween(sprite).to( {x: x, y: y}, 1000, "Quart.easeOut");
    tween.start()
    const tweenShadow = sprite.game.add.tween(sprite.data.shadow).to( {x: x + 5, y: y + 5}, 1000, "Quart.easeOut");
    tweenShadow.start()
}

const changeScaleDonut = (target, x) => {
    target.scale.setTo(x)
    target.data.shadow.scale.setTo(x)
}