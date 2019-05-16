export default class singleGem {
    constructor(game, state, row, coll, image, partWidth, partHeight) {
        this.game = game;
        this.state = state;
        this.row = row;
        this.coll = coll;
        this.image = image;
        this.partWidth = partWidth;
        this.partHeight = partHeight;
    }

    get x() {
        return this.partWidth * this.coll + 5
    }
    get y() {
        return this.partHeight * this.row + 5 + this.state.topBarHeight
    }
}