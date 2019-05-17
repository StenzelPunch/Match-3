import SingleGem from './SingleGem'
// import gemsImages from './donuts'


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

                const x = this.partWidth * j + this.partWidth / 2
                const y = this.partHeight * i  + this.partWidth / 2 + this.state.topBarHeight
                // const shadow = this.game.add.sprite(x + 6, y + 6, 'shadow')
                const donut = this.game.add.sprite(x, y, this.images[this.game.rnd.integerInRange(0, 5)])
                const gemConfig = [
                    i,
                    j,
                    this.images[randomInteger(0, 5)],
                    this.partWidth,
                    this.partHeight,
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
    get partWidth() {
        return this.width / this.colls;
    }
    get partHeight() {
        return this.height / this.rows;
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
            e.scale.setTo(0.6, 0.6)

        } else if (this.selectedGem == e){
            e.scale.setTo(0.5, 0.5)
            this.selectedGem = null
        } else {
            let tweenOld = this.game.add.tween(oldSprite).to( {x: newPos.x, y: newPos.y}, 1000, "Quart.easeOut");
            let tweenNew = this.game.add.tween(newSprite).to( {x: oldPos.x, y: oldPos.y}, 1000, "Quart.easeOut");
            this.selectedGem.scale.setTo(0.5, 0.5)
            tweenOld.start()
            tweenNew.start()

            oldSprite.data.row   = newData.row
            oldSprite.data.coll  = newData.coll
            newSprite.data.row   = oldData.row
            newSprite.data.coll  = oldData.coll

            this.content[oldData.row][oldData.coll] = newSprite;
            this.content[newData.row][newData.coll] = oldSprite;

            this.selectedGem = null;
        }
    }
}
