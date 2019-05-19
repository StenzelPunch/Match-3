import SingleGem from './SingleGem'

export default class GemsGrid {
    constructor(game, gridConfig) {
        this.width = gridConfig.gridWidth;
        this.height = gridConfig.gridHeight;
        this.rows = gridConfig.rows;
        this.cols = gridConfig.cols;
        this.images = gridConfig.images;
        this.game = game;
        this.gridConfig = gridConfig;
        this.selectedGem = null;
        this.content = []
        this.score = 0
        this.timeLeft = {t: 60}

        for (let i = 0; i < this.rows; i++) {
            const col = [];
            for (let j = 0; j < this.cols; j++) {

                const gem = new SingleGem (this, i, j)
                col.push(gem)
            }
            this.content.push(col);
        }
    }
    get partWidth() {
        return Math.floor(this.width / this.cols);
    }
    get partHeight() {
        return Math.floor(this.height / this.rows);
    }
    log(){
        console.log(this);
    }
    swap(e) {
        const selected = this.selectedGem ? this.selectedGem : null
        const selectedPos   = selected ? Object.assign({}, {col: selected.data.col, row: selected.data.row}) : null

        const target = e
        const targetPos   = Object.assign({}, {col: target.data.col, row: target.data.row})

        if (!this.selectedGem) {
            this.selectedGem = e
            changeScaleDonut(e, 0.6)
        } else if (doesRangeTooBig(this, selected, target)) {
            changeScaleDonut(this.selectedGem, 0.5)
            this.selectedGem = null
        }  else if (this.selectedGem == e){
            changeScaleDonut(e, 0.5)
            this.selectedGem = null
        } else {
            selected.data.col = targetPos.col
            selected.data.row  = targetPos.row
            target.data.col = selectedPos.col
            target.data.row = selectedPos.row


            changePosInGrid(selected, targetPos)
            changePosInGrid(target, selectedPos)
            changeScaleDonut(this.selectedGem, 0.5)

            const spritesToSwap = []
            spritesToSwap.push(...selected.data.swap(), ...target.data.swap())
            callTweens(spritesToSwap, this.searchMatch, this)
            this.selectedGem = null
        }
    }

    searchMatch(){
        const array = this.content;
        const matches = []
        matches.push(...search(array), ...search(transpose(array)))

        if (matches.length !== 0) {
            this.destroyMatches(matches)
            this.timeLeft.t += 2
        }
    }

    destroyMatches(matches) {
        let spritesToDestroy = []
        matches.forEach(group => {
            group.forEach(single => {
                this.content[single.row][single.col] = null
                spritesToDestroy.push(...single.destroy())
                this.score += 10
            })
        })
        callTweens(spritesToDestroy, this.moveDown, this)
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
                                    if (arr[subR][c] !== null) {
                                        arr[r][c] = arr[subR][c]
                                        arr[r][c].row = r
                                        arr[subR][c] = null
                                        break
                                    }
                                }
                            }
                        }
                    }
                }
            }
        }
        const spritesToSwap = []

            this.content.forEach(row => {
                // console.log(row)
                row.forEach(col => {
                    if (col) {
                        spritesToSwap.push(...col.swap())
                    }
                })
            })
            callTweens(spritesToSwap, this.spawnNew, this)
    }

    spawnNew() {
        const spritesToSpawn = []
        for (let row in this.content) {
            for (let col in this.content[row]) {
                if (this.content[row][col] === null) {
                    this.content[row][col] = new SingleGem(this, row, col)
                    spritesToSpawn.push(...this.content[row][col].spawn())
                }
            }
        }
        callTweens(spritesToSpawn, this.searchMatch, this)
    }
}

const search = array => {
    const matches = []
    for (let row in array) {
        let bufer = []
        for (let col in array[row]) {
            if (array[row][col]) {
                if (bufer.length > 0) {
                    if (array[row][col] != null && array[row][col] != 'target' && bufer[bufer.length - 1].gem.key == array[row][col].gem.key) {
                        bufer.push(array[row][col])
                        if (col == array[row].length - 1 && bufer.length >= 3) {
                            matches.push(bufer)
                        }
                    } else {
                        if (bufer.length >= 3) {
                            matches.push(bufer)
                        }
                        bufer = []
                        bufer.push(array[row][col])
                    }
                } else {
                    bufer.push(array[row][col])
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

const changeScaleDonut = (target, x) => {
    target.scale.setTo(x)
    target.data.shadow.scale.setTo(x)
}

const callTweens = (tweens, callback, context) => {
    let tweenStack = tweens.length
    tweens.forEach(tween => {
        tween.onComplete.add(() => {
            tweenStack--
            if (tweenStack === 0) {
                callback.call(context)
            }
        }, context)
        tween.start()
    })
}

const doesRangeTooBig = (grid, oldPos, newPos) => {
    const gapX = grid.partWidth,
          gapY = grid.partHeight,
          newX = newPos.position.x,
          newY = newPos.position.y,
          oldX = oldPos.position.x,
          oldY = oldPos.position.y
    if (newX === oldX + gapX && newY === oldY || newX === oldX - gapX && newY === oldY ) {
       return false
    } else if (newY === oldY + gapY && newX === oldX || newY === oldY - gapY && newX === oldX ) {
        return false
    } else {
        return true
    }
}

const changePosInGrid = (e, targetPos) => {
    e.data.parent.content[targetPos.row][targetPos.col] = e.data
}