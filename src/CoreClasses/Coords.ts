export class Coords {
    public x: number = 0;
    public y: number = 0;

    constructor() {
        this.x = 0;
        this.y = 0;
    }

    Add(coods: Coords): Coords {
        let ph: Coords = this
        ph.x += coods.x;
        ph.y += coods.y;
        return ph;
    }

    Mul(by: number): Coords {
        let ph: Coords = this;
        ph.x *= by;
        ph.y *= by;
        return ph;
    }

    Dia():number {
        let x = this.x;
        let y = this.y;
        return Math.sqrt((x*x)+(y*y))
    }

    DiaWoSquare():number {
        let x = this.x;
        let y = this.y;
        return (x*x)+(y*y);
    }

    Floor():void {
        this.x = Math.floor(this.x);
        this.y = Math.floor(this.y);
    }

    Ceil():void {
        this.x = Math.ceil(this.x);
        this.y = Math.ceil(this.y);
    }



    //TODO create universal helper from this, its preatty much exist in Arrazy2D
    ActionWithAll(func: (elem: number) => void): void {
        let elem = this.x;
        func(elem);
        elem = this.y
        func(elem);
    }

}