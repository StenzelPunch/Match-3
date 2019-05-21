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
        this.timeLeft = {t: 30}
        this.isLineStarted = false
        this.line = []

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
        let spritesToDestroy = []
        matches.forEach(single => {
            this.content[single.row][single.col] = null
            spritesToDestroy.push(...single.destroy())
            this.score += 10
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
