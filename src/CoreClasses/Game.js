import { Cell } from '../CoreClasses/Cell.js';
import { Level } from './Level.js';
import { MurMurHash } from './Helpers/MurMurHash.js';
import { Array2D } from './Helpers/Array2D.js';
import { Player } from '../UserClasses/Player.js';
import { Input } from './Input.js';
export class Game {
    static DeltaTime() {
        return Game.deltaTime;
    }
    Game() {
        throw TypeError("Game class is strictly static");
    }
    //initialize class
    static Init() {
        Game.cells = new Array2D(Game.width, Game.height, new Cell());
        Input.Init();
    }
    //move to seperate class.
    static RenderInit(gameWindow) {
        document.body.style.backgroundColor = "#333333";
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
                elem.setAttribute("id", `${i};${j}`); //dunno
                elem.innerText = "⬛"; //this is just for empty cell 
                Game.cells.array[i][j].hash = MurMurHash.ToHash(elem.innerText, 0);
                // elem.style.filter = "invert(1)";
                gameWindow.append(elem);
            }
        }
        let level = new Level();
        let gmtest = new Player();
        gmtest.symbol = "P";
        gmtest.coords.x = 0;
        gmtest.coords.y = 0;
        level.gameobjects.array[0][0] = gmtest;
        Game.LoadLevel(level);
        Game.StartGameLoop();
    }
    static LoadLevel(level) {
        for (let i = 0; i < Game.cells.array.length; i++) {
            for (let j = 0; j < Game.cells.array[i].length; j++) {
                if (!level.gameobjects.array[i][j].empty)
                    Game.RegisterGameobject(level.gameobjects.array[i][j]);
            }
        }
    }
    static StartGameLoop() {
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
    static GameLoop() {
        //Call updates on GameObjects
        const frameDuration = 1000 / Game.targetFPS;
        //Game.prevFrameTime = performance.now();
        const currentTime = performance.now();
        Game.deltaTime = currentTime - Game.prevFrameTime;
        if (Game.deltaTime >= frameDuration) {
            Game.prevFrameTime = currentTime;
            for (let i = 0; i < Game.gameObjects.length; i++) {
                Game.gameObjects[i].Update();
            }
            Game.Render();
            // Game.deltaTime = performance.now() - Game.prevFrameTime;
            let fpsCounter = document.getElementsByClassName("fpscounter")[0];
            let deltaTimeOut = document.getElementsByClassName("deltaTime")[0];
            //vsync
            let fpsCapElem = document.getElementById("fpsCap");
            // let fpsCap: number = 30;
            if (fpsCapElem != null)
                Game.targetFPS = Number.parseInt(fpsCapElem.value || "60");
            // let maxFrameRateDelay: number = 1 / fpsCap * 1000;
            // maxFrameRateDelay -= Game.deltaTime;
            // let fps: string;
            // if (maxFrameRateDelay <= 0) {
            //     maxFrameRateDelay = 0;
            // }
            // fps = ((1 / maxFrameRateDelay) * 1000).toFixed(2);
            // else
            // {
            //     
            // }
            fpsCounter.style.color = "white";
            deltaTimeOut.style.color = "white";
            fpsCounter.innerText = `FPS: ${(1000 / Game.deltaTime).toFixed()}`;
            deltaTimeOut.innerText = `DeltaTime: ${Math.round((Game.deltaTime * 10))}`;
        }
        requestAnimationFrame(Game.GameLoop);
        // setTimeout(Game.NextFrameHandler, maxFrameRateDelay);
    }
    static NextFrameHandler() {
        requestAnimationFrame(Game.GameLoop);
    }
    //TODO movr rendering to its own seperate class
    static Render() {
        //care ab render lol
        let gameObjectsToRender;
        gameObjectsToRender = new Array2D(Game.width, Game.height, new Cell());
        gameObjectsToRender.ActionWithAll((el) => { el = new Cell(); });
        for (let i = 0; i < Game.gameObjects.length; i++) {
            let gO = Game.gameObjects[i];
            let cell = gameObjectsToRender.Access(gO.coords.x, gO.coords.y);
            cell.symbol = gO.symbol;
            cell.color = gO.color;
            cell.empty = false;
            cell.hash = MurMurHash.ToHash(gO.symbol + gO.color, 0);
            //add color
        }
        for (let i = 0; i < Game.cells.array.length; i++) {
            for (let j = 0; j < Game.cells.array[i].length; j++) {
                // if(!gameObjectsToRender.Access(i,j).empty)
                // {
                // console.log(gameObjectsToRender.array[i][j]);
                if (typeof gameObjectsToRender.array[i][j] == "function")
                    continue;
                if (Game.cells.array[i][j].hash != gameObjectsToRender.array[i][j].hash) {
                    let elem = document.getElementById(`${i};${j}`);
                    if (elem != null) {
                        let gO = gameObjectsToRender.array[i][j];
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
    static RegisterGameobject(gameObject) {
        Game.gameObjects.push(gameObject);
    }
    //Call this only from specified GameObject
    static RemoveGameobject(gameObjectToRemove) {
        const index = Game.gameObjects.findIndex(gameObject => gameObject === gameObjectToRemove);
        if (index !== -1) {
            Game.gameObjects.splice(index, 1); // Removes the item in place
        }
    }
}
//display size only
Game.width = 10;
Game.height = 10;
Game.gameObjects = new Array(0);
Game.prevFrameTime = -1;
Game.deltaTime = 0;
Game.timeRef = 0;
Game.targetFPS = 45;
