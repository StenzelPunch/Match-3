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

        for (let i = 0; i < this.rows; i++) {
            const coll = [];
            for (let j = 0; j < this.colls; j++) {

                const gem = new SingleGem (this, i, j)
                coll.push(gem)
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
    log(){
        console.log(this);
    }
    swap(e) {
        console.log(e);

        const that = this.parent // call in SinglGem
        const selected = this.selectedGem ? this.selectedGem : null
        const selectedPos   = selected ? Object.assign({}, {coll: selected.data.coll, row: selected.data.row}) : null

        const target = e
        const targetPos   = Object.assign({}, {coll: target.data.coll, row: target.data.row})

        if (!this.selectedGem) { // first click
            this.selectedGem = e
            changeScaleDonut(e, 0.6)
        } else if (doesRangeTooBig(this, selected, target)) { //target is nit near
            changeScaleDonut(this.selectedGem, 0.5)
            this.selectedGem = null
        }  else if (this.selectedGem == e){ //same donut
            changeScaleDonut(e, 0.5)
            this.selectedGem = null
        } else {
            selected.data.coll = targetPos.coll
            selected.data.row  = targetPos.row
            target.data.coll = selectedPos.coll
            target.data.row = selectedPos.row

            changeScaleDonut(this.selectedGem, 0.5)

            this.selectedGem = null;

            // this.searchMatch()


        }
    }
    /* generateElements() {

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
    return matches; */
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

const doesRangeTooBig = (grid, oldPos, newPos) => {
    const gapX = grid.partWidth,
          gapY = grid.partHeight,
          newX = newPos.x,
          newY = newPos.y,
          oldX = oldPos.x,
          oldY = oldPos.y
    if (newX === oldX + gapX && newY === oldY || newX === oldX - gapX && newY === oldY ) {
       return false
    } else if (newY === oldY + gapY && newX === oldX || newY === oldY - gapY && newX === oldX ) {
        return false
    } else {
        return true
    }
}