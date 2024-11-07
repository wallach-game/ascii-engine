import { Coords } from "./Coords.js";
import { Game } from "./Game.js";
export class WholeNumberCompensator2D {
    constructor() {
        this.accumulated = new Coords();
    }
    AccumulateChange(change) {
        this.accumulated.Add(change.Mul(Game.DeltaTime()));
    }
    GetChange() {
        let cdTR = this.accumulated;
        if (cdTR.Dia() >= 1) {
            console.log("over 1");
            console.log(this.accumulated);
            this.accumulated = new Coords();
            cdTR.Floor();
            console.log(cdTR);
            return cdTR;
        }
        else {
            return new Coords();
        }
    }
}
