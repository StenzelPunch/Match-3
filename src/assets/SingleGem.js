export default class SingleGem {
    constructor(parent, row, coll) {
        this.parent = parent;
        this._row = row
        this._coll = coll
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
        return this.parent.partWidth * this.coll + this.parent.partWidth / 2;
    }
    get y() {
        return this.parent.partHeight * this.row  + this.parent.partHeight / 2 + this.state.topBarHeight
    }
    get row() {
        return this._row
    }
    get coll() {
        return this._coll
    }
    set row(newRow) {
        this._row = newRow
        this.tweenY(this.y)
    }

    set coll(newColl) {
        this._coll = newColl
        this.tweenX(this.x)
    }

    createGem () {
        const imageNumber = this.state.game.rnd.integerInRange(0, 5)
        const donut = this.game.add.sprite(this.x, this.y, this.state.images[imageNumber])
        donut.data = this
        donut.scale.setTo(0.5);
        donut.anchor.set(0.5)
        donut.inputEnabled = true;
        donut.events.onInputDown.add(this.swap, this)
        return donut
    }
    createGemShadow () {
        const shadow = this.game.add.sprite(this.x + 5, this.y + 5, 'shadow')
        shadow.scale.setTo(0.5);
        shadow.anchor.set(0.5)
        shadow.data = this
        return shadow
    }
    swap(e){
        this.parent.swap.call(this.parent, e)
    }
    tweenX(x) {
        const tween = this.game.add.tween(this.gem).to( {x: x}, 1000, "Quart.easeOut");
        tween.start()
        const tweenShadow = this.game.add.tween(this.shadow).to( {x: x + 5}, 1000, "Quart.easeOut");
        tweenShadow.start()
    }
    tweenY(y) {
        const tween = this.game.add.tween(this.gem).to( {y: y}, 1000, "Quart.easeOut");
        tween.start()
        const tweenShadow = this.game.add.tween(this.shadow).to( {y: y + 5}, 1000, "Quart.easeOut");
        tweenShadow.start()
    }
}
