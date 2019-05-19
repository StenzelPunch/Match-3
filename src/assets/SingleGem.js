export default class SingleGem {
    constructor(parent, row, col) {
        this.parent = parent;
        this._row = row
        this._col = col
        this.shadow = this.createGemShadow()
        this.gem = this.createGem()
    }
    get state () {
        return this.parent.state
    }
    get game() {
        return this.parent.state.game
    }
    get x() {
        return this.parent.partWidth * this.col + this.parent.partWidth / 2;
    }
    get y() {
        return this.parent.partHeight * this.row  + this.parent.partHeight / 2 + this.state.topBarHeight
    }
    get row() {
        return this._row
    }
    get col() {
        return this._col
    }
    set row(newRow) {
        this._row = newRow
        // this.tweenY(this.parent.partHeight * this.row + this.parent.partHeight / 2 + this.state.topBarHeight)
    }

    set col(newСol) {
        this._col = newСol
        // this.tweenX(this.parent.partWidth * this.col + this.parent.partWidth / 2)
    }

    createGem () {
        const imageNumber = this.state.game.rnd.integerInRange(0, 5)
        const donut = this.game.add.sprite(this.x, this.y, this.state.images[imageNumber])
        donut.data = this
        donut.scale.setTo(0.5);
        donut.anchor.set(0.5)
        donut.inputEnabled = true;
        donut.events.onInputDown.add(this.click, this)
        return donut
    }
    createGemShadow () {
        const shadow = this.game.add.sprite(this.x + 5, this.y + 5, 'shadow')
        shadow.scale.setTo(0.5);
        shadow.anchor.set(0.5)
        shadow.data = this
        return shadow
    }
    click(e){
        this.parent.swap.call(this.parent, e)
    }
    swap() {
        const tweenX = this.game.add.tween(this.gem).to( {x: this.x}, 300, "Quart.easeOut");
        const tweenY = this.game.add.tween(this.gem).to( {y: this.y}, 300, "Quart.easeOut");
        const tweenShadowX = this.game.add.tween(this.shadow).to( {x: this.x + 5}, 300, "Quart.easeOut");
        const tweenShadowY = this.game.add.tween(this.shadow).to( {y: this.y + 5}, 300, "Quart.easeOut");
        return [tweenShadowX, tweenShadowY, tweenX, tweenY]
    }
    destroy() {
        const destroyTweenShadow = this.parent.game.add.tween(this.shadow.scale).to({ x: 0, y: 0}, 300, "Quart.easeOut")
        const destroyTweenGem = this.parent.game.add.tween(this.gem.scale).to({ x: 0, y: 0}, 300, "Quart.easeOut")
        return [destroyTweenShadow, destroyTweenGem]
    }
    spawn() {
        const spawnTweenShadow = this.parent.game.add.tween(this.shadow).from({ y: 5}, 300, "Quint.easeOut", true)
        const spawnTweenGem = this.parent.game.add.tween(this.gem).from({ y: 0}, 300, "Quint.easeOut", true)
        return [spawnTweenShadow, spawnTweenGem]
    }
}
