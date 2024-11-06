export class Coords {
        public x: number = 0;
        public y: number = 0;

        Add(coods: Coords):Coords
        {
            let ph: Coords = this
            ph.x += coods.x;
            ph.y += coods.y;
            return ph;
        }

        Mul(by:number):Coords{
            let ph: Coords  = this;
            ph.x *= by;
            ph.y *= by;
            return ph;
        }
    }