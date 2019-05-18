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
        const selected = this.selectedGem ? this.selectedGem : null
        const selectedPos   = selected ? Object.assign({}, {coll: selected.data.coll, row: selected.data.row}) : null

        const target = e
        const targetPos   = Object.assign({}, {coll: target.data.coll, row: target.data.row})

        if (!this.selectedGem) { // first click
            this.selectedGem = e
            changeScaleDonut(e, 0.6)
        } /* else if (doesRangeTooBig(this, selected, target)) { //target is nit near
            console.log(selected)
            console.log(target)
            changeScaleDonut(this.selectedGem, 0.5)
            this.selectedGem = null
        } */  else if (this.selectedGem == e){ //same donut
            changeScaleDonut(e, 0.5)
            this.selectedGem = null
        } else {
            selected.data.coll = targetPos.coll
                selected.data.row  = targetPos.row
                target.data.coll = selectedPos.coll
                target.data.row = selectedPos.row
            changePosInGrid(selected, targetPos)
            changePosInGrid(target, selectedPos)


            changeScaleDonut(this.selectedGem, 0.5)

            this.selectedGem = null;

            this.searchMatch()




        }
    }

    searchMatch(option){
        const array = this.content;
        const matches = []
        matches.push(...search(array), ...search(transpose(array)))


        if (!option && matches !== []) {
            this.destroyMatches(matches)
        } else {
            return matches
        }

        const mask = arrMask(this.content)
        console.group()
        console.info('1')
        console.table(mask)
        console.groupEnd()
        this.moveDown()
        this.spawnNew()
    }
    destroyMatches(matches) {
        matches.forEach(group => {
            group.forEach(single => {
                this.content[single.row][single.coll] = null
                single.destroy()
            })
        })
    }

    moveDown() {

        const arr = this.content
        for (let r = arr.length - 1; r >= 0; r--) {
            for (let c = arr[r].length - 1; c >= 0; c--) {
                if (arr[r][c] === null) {
                    if (arr[r - 1]) {
                        if (arr[r - 1][c]){
                            arr[r][c] = arr[r - 1][c]
                            arr[r][c].row = r
                            arr[r - 1][c] = null
                        } else {
                            for (let subR = r; subR >= 0; subR--) {
                                if (arr[subR]){
                                    if (arr[subR][c] === null) {
                                        // if (arr[subR - 1][c] === null) {
                                        //     console.log('null up', subR, c)
                                        // } else {
                                        //     console.log('up', subR, c)
                                        // }
                                    } else if (arr[subR][c] !== null) {
                                        arr[r][c] = arr[subR][c]
                                        arr[r][c].row = r
                                        arr[subR][c] = null
                                        break
                                    }
                                }
                            }
                        }
                    } else if (arr[r - 1] === null) {

                    } else if (arr[r - 1] === undefined) {

                    }
                }
            }
        }
        const mask = arrMask(this.content)
        console.group()
        console.info('1')
        console.table(mask)
        console.groupEnd()
    }
    spawnNew() {
        for (let row in this.content) {
            for (let coll in this.content[row]) {
                if (this.content[row][coll] === null) {
                    this.content[row][coll] = new SingleGem(this, row, coll).spawn()
                }
            }
        }
    }
}


const search = array => {
    const matches = []
    for (let row in array) {
        let bufer = []
        for (let coll in array[row]) {
            if (array[row][coll]) {
                if (bufer.length > 0) {
                    if (array[row][coll] != null && array[row][coll] != 'target' && bufer[bufer.length - 1].gem.key == array[row][coll].gem.key) {
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
            } else {
                if (bufer.length >= 3) {
                    matches.push(bufer)
                }
                bufer = []
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

const changePosInGrid = (e, targetPos) => {
    e.data.parent.content[targetPos.row][targetPos.coll] = e.data
}

const arrMask = arr => {
    const arrMask = arr.map(row => row.map(coll => {
        let color = ''
        if (coll !== null && coll !== undefined && coll != 'target') {
            switch (coll.gem.key) {
                case 'gem-00':
                    color = 'К'
                    break;
                case 'gem-01':
                    color = 'C'
                    break;
                case 'gem-02':
                    color = 'З'
                    break;
                case 'gem-03':
                    color = 'Г'
                    break;
                case 'gem-04':
                    color = 'Ж'
                    break;
                case 'gem-05':
                    color = 'Р'
                    break;
                default:
                    break;
            }
            return color
        } else if (coll === 'target') {
            return 1
        } else {
            return 0
        }

    }))
    return arrMask
}