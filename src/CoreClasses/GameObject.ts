import { Coords } from '../CoreClasses/Coords.js'
import { Game } from './Game.js';

export class GameObject {
    coords: Coords = new Coords();
    symbol: string = "";
    color: string = "#fff";
    empty: boolean = false;
    hash: number = 0;


    constructor(empty = false)
    {
        if(empty)this.empty=true;
    }

    //test
    Start(): void { }
    Update(): void { }


    Destroy(): void {
        Game.RemoveGameobject(this);
    }
}
