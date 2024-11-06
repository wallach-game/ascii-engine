import { Coords } from "./Coords.js";
import { GameObject } from "./GameObject.js";

export class Cell {
    coords: Coords = new Coords();
    symbol: string = '';
    color: string = '';
    hash: number = 0;
    empty: boolean = true;

    constructor()
    {
    }
}