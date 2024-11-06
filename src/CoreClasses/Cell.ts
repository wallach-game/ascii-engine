import { Coords } from "./Coords";
import { GameObject } from "./GameObject";

export class Cell {
    coords: Coords = new Coords();
    gameObjects : GameObject[] = [];

    public Cell(x:number, y:number)
    {
        this.coords.x = x;
        this.coords.y = y;
    }
}