import { Coords } from "./Coords.js";
export class Cell {
    constructor() {
        this.coords = new Coords();
        this.symbol = '';
        this.color = '';
        this.hash = 0;
        this.empty = true;
    }
}
