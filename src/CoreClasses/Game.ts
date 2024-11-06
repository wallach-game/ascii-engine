import { Cell } from '../CoreClasses/Cell'
import { GameObject } from './GameObject';
export class Game {


    //display size only
    static width: number = 50;
    static height: number = 50;

    private static cells: Cell[][];
    private static gameObjects: GameObject[];

    public Game() {
        throw TypeError("Game class is strictly static");
    }

    //initialize class
    static Init(): void {
        Game.cells = new Array(Game.height);
        for (let i = 0; i < Game.height; i++) {
            Game.cells[i] = new Array(Game.length);
        }
    }

    static RegisterGameobject(gameObject: GameObject) {
        Game.gameObjects.push(gameObject);
    }

    //Call this only from specified GameObject
    static RemoveGameobject(gameObjectToRemove: GameObject) {
        const index = Game.gameObjects.findIndex(gameObject => gameObject === gameObjectToRemove);
        if (index !== -1) {
            Game.gameObjects.splice(index, 1);  // Removes the item in place
        }
    }
}