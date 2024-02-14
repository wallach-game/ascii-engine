// Assuming you have a GameObject class representing game objects
// Assuming your classes are in files named "GameObject.js" and "Game.js"
// Assuming your classes are in files named "GameObject.js" and "Game.js"
function loadClass(className) {
    return new Promise((resolve, reject) => {
        const script = document.createElement("script");
        script.src = `${className}.js`; // Assuming classes are in separate files
        script.onload = () => {
            resolve(window[className]); // Access the loaded class through the global window object
        };
        script.onerror = reject;
        document.head.appendChild(script);
    });
}

var loaded = false;

loadClass("GameObject").then(() => {
    loadClass("Player").then(() => {
        loadClass("Wall").then(() => {
            loadClass("Game").then(() => {
                execution();
            });
        })
    })
})



function execution() {
    Game.gameStart();
}




// // const MAX_X = 80; // Adjust based on your desired width
// // const MAX_Y = 25; // Adjust based on your desired height
// // const screen = document.getElementById("game-window");
// // var pixels = [25];

// // for (let i = 0; i < 25; i++) {
// //     pixels[i] = [];
// //     for (let j = 0; j < 80; j++) {
// //       pixels[i][j] = i * MAX_X + j + 1;
// //     }
// //   }

// // clearScreen();


// function clearScreen()
// {
//     for (let i = 0; i < 25; i++) {
//         for (let j = 0; j < 80; j++) {
//             pixels[i][j] = "\u00A0";
//         }
//     }
// }

// function renderSymbol(x, y, symbol) {
//     pixels[y][x] = symbol;
// }

// function updateScreen() {
//     let output = "";
//     for (let y = 0; y < 25; y++) {
//         for (let x = 0; x < 80; x++) {
//             output += pixels[y][x];
//         }
//         output += "\n";
//         console.log(output)
//     }
//     screen.textContent = output;
// }


// // document.addEventListener("keyup", (event) => {

// // }




// const gameObjects = []; // Array to store game objects

// // Create some example game objects
// const player = new Player(5, 5, "P");
// gameObjects.push(player);

// // Game loop function
// function gameLoop() {
//   // Clear console or update display (replace with your rendering logic)
// //   console.clear();
// clearScreen();

//   // Update each game object
//   for (const gameObject of gameObjects) {
//     gameObject.update();
//   }

//   // Handle input (replace with your key handling logic)
//   // ... (code from previous examples)
//   document.addEventListener("keydown", (event) => {
//     if(event.key === "d")
//     {
//         //move player left
//         console.log("left");

//     }
// });


//   // Render all game objects (replace with your rendering logic)
//   for (const gameObject of gameObjects) {
//     gameObject.render();
//   }

//   updateScreen();

//   // Schedule next game loop at 30 FPS
//   setTimeout(gameLoop, 1000 / 30); // Adjust 1000/30 for desired FPS
// }

// // Start the game loop
// gameLoop();

// // GameObject class (replace with your implementation)



