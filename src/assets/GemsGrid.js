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
        this.timeLeft = {t: 45}
        this.isLineStarted = false
        this.line = []
        this.scoreX2 = false

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
    destroyMatches(matches) {

        console.log()
        let spritesToDestroy = []
        const arr = this.specGems(matches)
        arr.forEach(single => {
            this.content[single.row][single.col] = null
            spritesToDestroy.push(...single.destroy())
            this.score += arr.length * 50
            if (this.scoreX2) {
                this.score += arr.length * 100
                this.scoreX2 = false
            }
        })
        callTweens(spritesToDestroy, this.moveDown, this)
        this.game.add.audio('kill').play()
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
        callTweens(spritesToSpawn, console.log, this)
    }
    specGems (matches) {
        const arr = matches
        arr.forEach(gem => {
            if (gem.gem.key === 'gem_07') {
                for (let row in this.content) {
                    for (let col in this.content[row]) {
                        if (arr[arr.length - 1].gem.key == this.content[row][col].gem.key) {
                            arr.push(this.content[row][col])
                        }
                    }
                }
            } else if (gem.gem.key === 'gem_08') {
                for (let row in this.content) {
                    if (row == gem.row) {
                        console.log(row)
                        for (let col in this.content[row]) {
                            arr.push(this.content[row][col])
                        }
                    } else {
                        for (let col in this.content[row]) {
                            if (col == gem.col) {
                                arr.push(this.content[row][col])
                            }
                        }
                    }
                }
            } else if (gem.gem.key === 'gem_09'){
                for (let row in this.content) {
                    for (let col in this.content[row]) {
                        if (col == gem.col) {
                            arr.push(this.content[row][col])
                        }
                    }
                }
            } else if (gem.gem.key === 'gem_10') {
                for (let row in this.content) {
                    if (row == gem.row) {
                        console.log(row)
                        for (let col in this.content[row]) {
                            arr.push(this.content[row][col])
                        }
                    }
                }
            } else if (gem.gem.key === 'gem_12') {
                this.timeLeft.t += 5
            } else if (gem.gem.key === 'gem_11') {
                console.log(score)
                this.scoreX2 = true
            }
        })
        console.log(arr)
        return arr
    }
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
