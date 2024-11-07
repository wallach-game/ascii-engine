import { Coords } from '../CoreClasses/Coords.js';
import { Game } from './Game.js';
export class GameObject {
    constructor(empty = false) {
        this.coords = new Coords();
        this.symbol = "";
        this.color = "#fff";
        this.empty = false;
        this.hash = 0;
        if (empty)
            this.empty = true;
    }
    //test
    Start() { }
    Update() { }
    Destroy() {
        Game.RemoveGameobject(this);
    }
}
