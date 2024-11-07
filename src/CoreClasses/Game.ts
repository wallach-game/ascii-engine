import { Cell } from '../CoreClasses/Cell.js'
import { GameObject } from './GameObject.js';
import { Level } from './Level.js';
import { MurMurHash } from './Helpers/MurMurHash.js';
import { Array2D } from './Helpers/Array2D.js';
import { Player } from '../UserClasses/Player.js'
export class Game {


    //display size only
    static width: number = 10;
    static height: number = 10;

    private static cells: Array2D<Cell>;
    private static gameObjects: GameObject[] = new Array(0);

    private static prevFrameTime: number = -1;
    private static deltaTime: number = 0;
    private static timeRef: number = 0;

    public static DeltaTime():number{
        return Game.deltaTime;
    }



    public Game() {
        throw TypeError("Game class is strictly static");
    }

    //initialize class
    static Init(): void {
        Game.cells = new Array2D(Game.width, Game.height, new Cell());
    }

    //move to seperate class.
    static RenderInit(gameWindow: HTMLElement): void {
        document.body.style.backgroundColor = "#cccccc";
        gameWindow.style.display = "grid";
        gameWindow.style.gridTemplateColumns = `repeat(${Game.width},1fr)`;
        gameWindow.style.backgroundColor = "#dbdbdb";
        gameWindow.style.width = `calc(${Game.width} * 1.4em)`;
        gameWindow.style.height = `calc(${Game.height} * 1.4em)`;
        //its not goin to be that easy
        // add debug flag
        for (let i = 0; i < Game.cells.array.length; i++) {
            for (let j = 0; j < Game.cells.array[i].length; j++) {
                let elem = document.createElement("span");
                elem.setAttribute("id", `${i};${j}`);//dunno
                elem.innerText = "⬛";//this is just for empty cell 
                Game.cells.array[i][j].hash = MurMurHash.ToHash(elem.innerText, 0);
                // elem.style.filter = "invert(1)";
                gameWindow.append(elem);
            }
        }

        let level: Level = new Level();
        let gmtest: Player = new Player();
        gmtest.symbol = "P";
        gmtest.coords.x = 0;
        gmtest.coords.y = 0;
        level.gameobjects.array[0][0] = gmtest;
        Game.LoadLevel(level);
        Game.StartGameLoop();
    }

    static LoadLevel(level: Level) {
        for (let i = 0; i < Game.cells.array.length; i++) {
            for (let j = 0; j < Game.cells.array[i].length; j++) {
                if (!level.gameobjects.array[i][j].empty)
                    Game.RegisterGameobject(level.gameobjects.array[i][j]);
            }
        }
    }




    private static StartGameLoop(): void {
        //render first frame
        Game.Render();
        //call start on all GameObjects
        for (let i = 0; i < Game.gameObjects.length; i++) {
            Game.gameObjects[i].Start();
        }
        //TODO create an fps couter here
        //and create an variable Time.deltaTime.
        // Game.prevFrameTime = Game.deltaTime;
        Game.GameLoop();
    }

    private static GameLoop(): void {
        //Call updates on GameObjects
        Game.prevFrameTime = performance.now();
        for (let i = 0; i < Game.gameObjects.length; i++) {
            Game.gameObjects[i].Update();
        }
        Game.Render();
        Game.deltaTime = performance.now() - Game.prevFrameTime;
        let fpsCounter: HTMLElement = document.getElementsByClassName("fpscounter")[0] as HTMLElement;
        let deltaTimeOut: HTMLElement = document.getElementsByClassName("deltaTime")[0] as HTMLElement;
        
        //vsync
        let fpsCapElem: HTMLInputElement | null = document.getElementById("fpsCap") as HTMLInputElement;
        let fpsCap: number = 30;
        if(fpsCapElem != null) fpsCap = Number.parseInt(fpsCapElem.value || "60");
        let maxFrameRateDelay:number = 1/fpsCap * 1000;
        maxFrameRateDelay -= Game.deltaTime;
        let fps:string;
        if(maxFrameRateDelay <= 0)
        {
            maxFrameRateDelay = 0;
        }
        fps= ((1 / maxFrameRateDelay)*1000).toFixed(2);
        // else
        // {
        //     
        // }
        fpsCounter.innerText = `FPS: ${fps}`;
        deltaTimeOut.innerText = `DeltaTime: ${Math.round((Game.deltaTime*10))}`;
        setTimeout(Game.NextFrameHandler, maxFrameRateDelay);
    }

    static NextFrameHandler(): void {
        requestAnimationFrame(Game.GameLoop);
    }

    //TODO movr rendering to its own seperate class

    private static Render(): void {
        //care ab render lol
        let gameObjectsToRender: Array2D<Cell>;
        gameObjectsToRender = new Array2D(Game.width, Game.height, new Cell());
        gameObjectsToRender.ActionWithAll((el) => { el = new Cell(); });
        for (let i = 0; i < Game.gameObjects.length; i++) {
            let gO: GameObject = Game.gameObjects[i];
            let cell: Cell = gameObjectsToRender.Access(gO.coords.x, gO.coords.y);
            cell.symbol = gO.symbol;
            cell.color = gO.color;
            cell.empty = false;
            cell.hash = MurMurHash.ToHash(gO.symbol+gO.color,0);
            //add color
        }



        for (let i = 0; i < Game.cells.array.length; i++) {
            for (let j = 0; j < Game.cells.array[i].length; j++) {
                // if(!gameObjectsToRender.Access(i,j).empty)
                // {
                // console.log(gameObjectsToRender.array[i][j]);
                if (typeof gameObjectsToRender.array[i][j] == "function") continue;
                if (Game.cells.array[i][j].hash != gameObjectsToRender.array[i][j].hash) {
                    let elem = document.getElementById(`${i};${j}`);
                    if (elem != null) 
                        {
                            let gO:Cell  = gameObjectsToRender.array[i][j];
                            elem.style.color = gO.color;
                            elem.innerText = gO.symbol;
                        }
                }
                // }

            }
        }

        // for (let i = 0; i < Game.cells.array.length; i++) {
        //     for (let j = 0; j < Game.cells.array[i].length; j++) {
        //         // for (let k = 0; k < Game.gameObjects.length; k++) {
        //         //     // if(Game.cells.array[i][j].hash = Game.gameObjects[k].hash)
        //         // }
        //         // if(Game.cells.array[i][j].hash != gameObjectsToRender.array[i][j].hash)
        //         // {
        //         //     let elem = document.getElementById(`${i};${j}`);
        //         //     if(elem != null) elem.innerText = gameObjectsToRender.array[i][j].symbol; 
        //         // }
        //     }
        // }
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