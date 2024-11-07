import { Game } from "./Game.js";
import { GameObject } from "./GameObject.js";
import { Array2D } from "./Helpers/Array2D.js";
export class Level {
    constructor() {
        //size its gonna be always game as gamesize, this can lead to issues
        // with level loading
        this.gameobjects = new Array2D(Game.height, Game.height, new GameObject(true));
    }
}
