class Render
{
    static screen = document.getElementById("game-window");
    static pixels = [25];
    static renderNeeded = [];

    //LEGACY - it it even usefull
    // static renderInit() {
    //     for (let i = 0; i < 25; i++) {
    //         this.pixels[i] = [];
    //         for (let j = 0; j < 80; j++) {
    //             this.pixels[i][j] = i * this.MAX_X + j + 1;
    //         }
    //     }
    // }


    static renderInit() {
        // Initialize renderNeeded array
        for (let i = 0; i < 25; i++) {
            this.renderNeeded[i] = [];
            this.pixels[i] = [];
            for (let j = 0; j < 80; j++) {
                this.renderNeeded[i][j] = true;
                this.pixels[i][j] = "\u00A0";
            }
        }
    }




    static clearScreen() {
        for (let i = 0; i < 25; i++) {
            for (let j = 0; j < 80; j++) {
                this.pixels[i][j] = "\u00A0";
                this.renderNeeded[i][j] = true;
            }
        }
    }

    //LEGACY - it it even usefull
    // static renderSymbol(x, y, symbol) {
    //     this.pixels[y][x] = symbol;
    // }


    static renderSymbol(x, y, symbol) {
        if (this.pixels[y][x] !== symbol) {
            this.pixels[y][x] = symbol;
            this.renderNeeded[y][x] = true; // Set renderNeeded for this pixel
        }
        else{
            this.renderNeeded[y][x] = false;
            this.pixels[y][x] = true;

        }
    }

    //LEGACY - it it even usefull
    // static updateScreen() {
    //     let output = "";
    //     for (let y = 0; y < 25; y++) {
    //         for (let x = 0; x < 80; x++) {
    //             let mouseCoords = Game.levelEditor.mouseCoords;
    //             if (x == mouseCoords.x && y == mouseCoords.y) 
    //             { 
    //                 output += `<span id="editorObj${Game.selectedId}" style='color:red'>■</span>`;
    //             }
    //             else
    //             {
    //                 output += this.pixels[y][x];
    //             }
                
    //         }
    //         output += "\n";
    //     }
    //     this.screen.innerHTML = output;
        // this.gameObjects.forEach(element => {
        //     if (element.ltInit) {
        //         element.lateInit();
        //     }
        // });

    // }

    //FIXME - MEM leak in render, ar 1 mil objects


    // static updateScreen() {
    //     let output = "";
    //     for (let y = 0; y < 25; y++) {
    //         for (let x = 0; x < 80; x++) {
    //             let mouseCoords = Game.levelEditor.mouseCoords;
    //             if (x === mouseCoords.x && y === mouseCoords.y) {
    //                 output += `<span id="editorObj${Game.selectedId}" style='color:red'>■</span>`;
    //             } else {
    //                 if (this.renderNeeded[y][x]) {
    //                     output += this.pixels[y][x];
    //                     this.renderNeeded[y][x] = false; // Reset renderNeeded for this pixel
    //                 } else {
    //                     output += "\u00A0"; // Non-changed pixels are spaces
    //                 }
    //             }
    //         }
    //         output += "\n";
    //     }
    //     this.screen.innerHTML = output;
    //     Game.gameObjects.forEach(element => {
    //         if (element.ltInit) {
    //             element.lateInit();
    //         }
    //     });
    // }


    //new update screen 
    //FIXME convert adding text to appent elemements.
    static updateScreen() {
        let fragment = document.createDocumentFragment();
        let output = "";
    
        for (let y = 0; y < 25; y++) {
            for (let x = 0; x < 80; x++) {
                let mouseCoords = Game.levelEditor.mouseCoords;
                if (x === mouseCoords.x && y === mouseCoords.y) {
                    output += `<span id="editorObj${Game.selectedId}" style='color:red'>■</span>`;
                } else {
                    if (this.renderNeeded[y][x]) {
                        output += this.pixels[y][x];
                        this.renderNeeded[y][x] = false; // Reset renderNeeded for this pixel
                    } else {
                        output += "\u00A0"; // Non-changed pixels are spaces
                    }
                }
            }
            output += "\n";
        }
    
        fragment.innerHTML = output;
        //Render.screen.innerHTML = fragment.innerHTML;
        console.log(fragment);
        //Render.screen.appendChild(fragment);
    
        Game.gameObjects.forEach(element => {
            if (element.ltInit) {
                element.lateInit();
            }
        });
    }
    


}