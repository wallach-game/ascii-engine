import { Game } from "./Game.js";
export class WholeNumberCompensator {
    constructor() {
        this.accumulated = 0;
    }
    AccumulateChange(change) {
        this.accumulated += change * Game.DeltaTime();
    }
    GetChange() {
        let cdTR = this.accumulated;
        if (cdTR >= 1) {
            this.accumulated = 0;
            cdTR = Math.floor(cdTR);
            return cdTR;
        }
        else {
            return 0;
        }
    }
}
