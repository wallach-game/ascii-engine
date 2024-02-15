class Game {
    static MAX_X = 80;
    static MAX_Y = 25;
    static screen = document.getElementById("game-window");
    static pixels = [25];
    static gameObjects = [];
    static prevTime = 0;
    static deltaTime = 0;
    static fpscounter = document.getElementsByClassName("fps")[0];
    static levelEditor = 0;
    static gameObjectIdCounter = 0;
    static pause = false;
    static selectedId = -1;


    static renderInit() {
        for (let i = 0; i < 25; i++) {
            this.pixels[i] = [];
            for (let j = 0; j < 80; j++) {
                this.pixels[i][j] = i * this.MAX_X + j + 1;
            }
        }
    }

    static clearScreen() {
        for (let i = 0; i < 25; i++) {
            for (let j = 0; j < 80; j++) {
                this.pixels[i][j] = "\u00A0";
            }
        }
    }

    static renderSymbol(x, y, symbol) {
        this.pixels[y][x] = symbol;
    }

    static updateScreen() {
        let output = "";
        for (let y = 0; y < 25; y++) {
            for (let x = 0; x < 80; x++) {
                let mouseCoords = Game.levelEditor.mouseCoords;
                if (x == mouseCoords.x && y == mouseCoords.y) 
                { 
                    output += `<span id="editorObj${Game.selectedId}" style='color:red'>■</span>`;
                }
                else
                {
                    output += this.pixels[y][x];
                }
                
            }
            output += "\n";
        }
        this.screen.innerHTML = output;
        this.gameObjects.forEach(element => {
            if (element.ltInit) {
                element.lateInit();
            }
        });

    }

    static gameLoop() {
        Game.prevTime = performance.now();
        // Clear console or update display (replace with your rendering logic)
        //   console.clear();
        Game.clearScreen();

        // Update each game object
        for (const gameObject of Game.gameObjects) {
            gameObject.update();
        }

        // Handle input (replace with your key handling logic)
        // ... (code from previous examples)



        // Render all game objects (replace with your rendering logic)
        for (const gameObject of Game.gameObjects) {
            gameObject.render();
            //TODO create pixel object
        }

        Game.updateScreen();

        // Schedule next game loop at 30 FPS
        // setTimeout(Game.gameLoop, 1000 / 15); // Adjust 1000/30 for desired FPS
        Game.deltaTime = (performance.now() - Game.prevTime);
        //console.log((1000 / 15) * Game.deltaTime);

        if (Game.pause) {
            return 0;
        }

        requestAnimationFrame(Game.gameLoop);
        Game.fpscounter.innerHTML = `FPS: ${Math.floor(1 / (Game.deltaTime / 1000))}`;
        //setTimeout(Game.gameLoop, (1000 / 60) * Game.deltaTime);
    }

    static gameStart() {
        Game.renderInit();
        Game.levelEditor = new LevelEditor();
        //here should be call for setup of every object alive when scene where scene begins


        document.addEventListener("keydown", (event) => {
            if (event.key === "w") {
                //move player left
                Game.gameObjects[0].move("up");
            }
            if (event.key === "s") {
                //move player left
                Game.gameObjects[0].move("down");
            }
            if (event.key === "a") {
                //move player left
                Game.gameObjects[0].move("left");
            }
            if (event.key === "d") {
                //move player left
                Game.gameObjects[0].move("right");
            }
            if (event.key === '=') {
                //TODO move this to separate class
                let cmd = prompt(`command input. \n
                actobjs -> prints all gameobjects in scene into console \n
                psframe -> pause game execution \n
                play -> start game execution
                `, "type ur cmd")
                {
                    if (cmd == "actobjs") {
                        console.log(Game.gameObjects);
                    }
                    if (cmd == "psframe") {
                        this.pause = true;
                    }
                    if (cmd == "play") {
                        this.pause = false;
                        this.gameLoop();
                    }
                }
            }
        });


        this.gameLoop();
    }

    static addGameObject(gameObject) {
        gameObject.id = this.gameObjectIdCounter;
        this.gameObjects.push(gameObject);
        this.gameObjectIdCounter++;
    }



}