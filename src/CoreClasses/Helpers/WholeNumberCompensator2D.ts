import { Coords } from "../Coords.js";
import { Game } from "../Game.js";

export class WholeNumberCompensator2D {
    private accumulated: Coords = new Coords();

    public AccumulateChange(change: Coords)
    {
        this.accumulated.Add(change.Mul((Game.DeltaTime()*0.01)));
    }

    public GetChange():Coords {
        let cdTR: Coords = this.accumulated;
        if(cdTR.Dia() >= 1)
        {
            // console.log("over 1");
            // console.log(this.accumulated);
            this.accumulated = new Coords();
            cdTR.Floor();
            // console.log(cdTR);
            return cdTR;
        }
        else
        {
            return new Coords();
        }
    }
}