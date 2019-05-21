export default class SingleGem {
    constructor(grid, row, col) {
        this.grid = grid;
        this._row = parseInt(row)
        this._col = parseInt(col)
        this.shadow = this.createGemShadow()
        this.gem = this.createGem()
        this.Game = this.game.state.callbackContext
    }
    get gridConfig () {
        return this.grid.gridConfig
    }
    get game() {
        return this.grid.gridConfig.game
    }
    get x() {
        return this.grid.partWidth * this.col + this.grid.partWidth / 2;
    }
    get y() {
        return this.grid.partHeight * this.row  + this.grid.partHeight / 2 + this.gridConfig.topBarHeight
    }
    get row() {
        return this._row
    }
    get col() {
        return this._col
    }
    set row(newRow) {
        this._row = newRow
    }

    set col(newСol) {
        this._col = newСol
    }

    createGem () {
        const imageNumber = getRandomImageNumber() - 1
        const donut = this.game.add.sprite(this.x, this.y, this.gridConfig.images[imageNumber])
        donut.inputEnabled = true;
        donut.data = this
        donut.anchor.set(0.5)
        donut.scale.set(this.gridConfig.scale)
        donut.events.onInputDown.add(this.startLine, this)
        this.game.input.onUp.add(this.outLine, this)

        donut.events.onInputOver.add(this.overLine, this)
        donut.events.onInputOut.add(this.overLine, this)
        donut.events.onInputUp.add(this.outLine, this)
        return donut


    }
    createGemShadow () {
        const shadow = this.game.add.sprite(this.x + 5, this.y + 5, 'shadow')
        shadow.anchor.set(0.5)
        shadow.scale.set(this.gridConfig.scale)
        shadow.data = this
        return shadow
    }
    startLine(e){
        this.grid.isLineStarted = true
        if(!isSpecial(e)){
            this.grid.line.push(e.data)
        }
        this.game.input.addMoveCallback(this.Game.folow, this.Game);
    }
    overLine(e){
        const line = this.grid.line
        if (line.length !== 0) {
            if (this.grid.isLineStarted) {
                if (!doesRangeTooBig(e.data, line[line.length - 1]) || !doesRangeTooBig(e.data, line[0])) {
                    if (line[line.length -1].gem.key == e.key) {
                        if(!isSameInline(e.data, line)) {
                            line.push(e.data)
                        }
                    } else if (isSpecial(e)) {
                        if(!isSameInline(e.data, line)) {
                            line.unshift(e.data)
                        }
                    }
                }
            }
        }

    }
    outLine(){
        this.grid.isLineStarted = false
        if (this.grid.line.length >= 3) {
            this.grid.destroyMatches(this.grid.line)
        }
        this.grid.line = []
    }
    swap() {
        const tweenX = this.game.add.tween(this.gem).to( {x: this.x}, 300, "Quart.easeOut");
        const tweenY = this.game.add.tween(this.gem).to( {y: this.y}, 300, "Quart.easeOut");
        const tweenShadowX = this.game.add.tween(this.shadow).to( {x: this.x + 5}, 300, "Quart.easeOut");
        const tweenShadowY = this.game.add.tween(this.shadow).to( {y: this.y + 5}, 300, "Quart.easeOut");
        return [tweenShadowX, tweenShadowY, tweenX, tweenY]
    }
    destroy() {
        const destroyTweenShadow = this.game.add.tween(this.shadow.scale).to({ x: 0, y: 0}, 300, "Quart.easeOut")
        const destroyTweenGem = this.game.add.tween(this.gem.scale).to({ x: 0, y: 0}, 300, "Quart.easeOut")
        return [destroyTweenShadow, destroyTweenGem]
    }
    spawn() {
        const spawnTweenShadow = this.game.add.tween(this.shadow.scale).from({ x: 0, y: 0}, 500, "Quart.easeOut")
        const spawnTweenGem = this.game.add.tween(this.gem.scale).from({ x: 0, y: 0}, 500, "Quart.easeOut")
        return [spawnTweenShadow, spawnTweenGem]
    }
}

const doesRangeTooBig = (next, pre) => {
    const nC = parseInt(next.col)
    const nR = parseInt(next.row)
    const pC = parseInt(pre.col)
    const pR = parseInt(pre.row)
    if (nC <= pC + 1 && nC >= pC - 1 && nR <= pR + 1 && nR >= pR - 1)  {
        return false
    } else {
        return true
    }
}

const isSameInline = (e, line) => {
    for (let element of line) {
        if (e.col == element.col && e.row == element.row) {
            return true
        }
    }
    return false
}

const isSpecial = (e) => {
    const key = e.key
    switch (key) {
        case 'gem_07':
        case 'gem_08':
        case 'gem_09':
        case 'gem_10':
        case 'gem_11':
        case 'gem_12':
            return true
        default:
            return false
    }
}
const getRandomImageNumber = () => {
    const r = getRanomFloat(0, 100)

    if (r < 16) {
        return 1
    } else if (r >= 16 && r < 32) {
        return 2
    } else if (r >= 32 && r < 48) {
        return 3
    } else if (r >= 48 && r < 64) {
        return 4
    } else if (r >= 64 && r < 80) {
        return 5
    } else if (r >= 80 && r < 96) {
        return 6
    } else if (r >= 96 && r < 96.7) {
        return 7
    } else if (r >= 96.7 && r < 97.4) {
        return 8
    } else if (r >= 97.4 && r < 98.1) {
        return 9
    } else if (r >= 98.1 && r < 98.7) {
        return 10
    } else if (r >= 98.7 && r < 98.3) {
        return 11
    } else if (r >= 98.3 && r <= 100) {
        return 12
    }

}
const getRanomFloat = (min, max) => {
    const randFloat = min + Math.random() * (max - min)
    return randFloat
}