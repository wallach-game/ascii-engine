class Game {
    static MAX_X = 80;
    static MAX_Y = 25;
    static screen = document.getElementById("game-window");
    static pixels = [25];
    static gameObjects = [];
    static prevTime = 0;
    static deltaTime = 0;
    static fpscounter = document.getElementsByClassName("fps")[0];

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
                output += this.pixels[y][x];
            }
            output += "\n";
        }
        this.screen.innerHTML = output;
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
        }

        Game.updateScreen();

        // Schedule next game loop at 30 FPS
        // setTimeout(Game.gameLoop, 1000 / 15); // Adjust 1000/30 for desired FPS
        Game.deltaTime = (performance.now() - Game.prevTime);
        //console.log((1000 / 15) * Game.deltaTime);
        console.log(Game.gameObjects[0].x);
        console.log(Game.gameObjects[0].y);
        requestAnimationFrame(Game.gameLoop);
        Game.fpscounter.innerHTML = `FPS: ${Math.floor( 1 / (Game.deltaTime/ 1000))}`;
        //setTimeout(Game.gameLoop, (1000 / 60) * Game.deltaTime);
    }

    static gameStart() {
        Game.renderInit();
        let player = new Player(5, 5, "<span style='color:red'>P</span>", false);
        //let wall = new Wall(10,10,"W", true);
        Game.gameObjects.push(player);

        let width = 100; // Adjust width and height as needed
        let height = 100;
        let noiseMap = new Array(width * height).fill(0);

        for (let y = 0; y < height; y++) {
            for (let x = 0; x < width; x++) {
                noiseMap[y * width + x] = Math.random();
            }
        }

        let wallThreshold = 0.68; // Adjust threshold for desired wall density

        for (let y = 0; y < 25; y++) {
            for (let x = 0; x < 80; x++) {
                let noiseValue = noiseMap[y * width + x];
                if (noiseValue > wallThreshold) {
                    let wall = new Wall(x * 1, y * 1, `<span style='color: rgb(${(0.5 - noiseValue) * -255},${(0.5 - noiseValue) * -255},${(0.5 - noiseValue) * -255})'>■</span>`, true); // Cre■ ■  ■■ate a wall object
                    Game.gameObjects.push(wall); // Add to your game objects array
                } else {
                    // Create floor or other terrain elements as needed
                }
            }
        }




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
        });
        Game.gameLoop();
    }



}