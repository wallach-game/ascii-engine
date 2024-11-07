export class Coords {
    constructor() {
        this.x = 0;
        this.y = 0;
        this.x = 0;
        this.y = 0;
    }
    Add(coods) {
        let ph = this;
        ph.x += coods.x;
        ph.y += coods.y;
        return ph;
    }
    Mul(by) {
        let ph = this;
        ph.x *= by;
        ph.y *= by;
        return ph;
    }
    Dia() {
        let x = this.x;
        let y = this.y;
        return Math.sqrt((x * x) + (y * y));
    }
    DiaWoSquare() {
        let x = this.x;
        let y = this.y;
        return (x * x) + (y * y);
    }
    Floor() {
        this.x = Math.floor(this.x);
        this.y = Math.floor(this.y);
    }
    Ceil() {
        this.x = Math.ceil(this.x);
        this.y = Math.ceil(this.y);
    }
    //TODO create universal helper from this, its preatty much exist in Arrazy2D
    ActionWithAll(func) {
        let elem = this.x;
        func(elem);
        elem = this.y;
        func(elem);
    }
}
