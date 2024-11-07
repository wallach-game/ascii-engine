import { Coords } from "./Coords.js";
import { Game } from "./Game.js";

export class WholeNumberCompensator {
    private accumulated:number = 0

    public AccumulateChange(change: number)
    {
        this.accumulated += change*Game.DeltaTime();
    }

    public GetChange():number {
        let cdTR: number = this.accumulated;
        if(cdTR >= 1)
        {
            this.accumulated = 0;
            cdTR = Math.floor(cdTR);
            return cdTR;
        }
        else
        {
            return 0;
        }
    }
}