import { UIComponents } from "./UIComponents.js";
import { Editor } from "../Editor.js";
import { GameObject } from "../../GameObject.js";
export class UILevelEditor extends HTMLElement {

    public classes: string[] = [];
    private gameObjects: GameObject[] = [];

    constructor() {
        super();
        this.attachShadow({ mode: 'open' });
    }


    connectedCallback(): void {
        this.shadowRoot!.innerHTML =
            `
            <h4>le..editor..</h4>
            width
            <input type="number" name="" id="lwidth" value="10">
            height
            <input type="number" name="" id="lheight" value="10">
            <div id="levelEditor">
            </div>
            <select id="GameobjectSelector"></select>
            `;

            this.InitLevelEditor();
    }


    InitLevelEditor():void {
        let gameWindow: HTMLElement = this.shadowRoot!.getElementById("levelEditor") as HTMLElement;
        let widthInput: HTMLInputElement = this.shadowRoot!.getElementById("lwidth") as HTMLInputElement;
        let heightInput: HTMLInputElement = this.shadowRoot!.getElementById("lheight") as HTMLInputElement;
        console.log([widthInput.value, heightInput.value]);
        let width:number = parseInt(widthInput.value);
        let height: number = parseInt(heightInput.value);
        console.log({width, height});
        gameWindow.style.display = "grid";
        gameWindow.style.gridTemplateColumns = `repeat(${width},1fr)`;
        gameWindow.style.backgroundColor = "#dbdbdb";
        gameWindow.style.width = `calc(${width} * 1.4em)`;
        gameWindow.style.height = `calc(${height} * 1.4em)`;
        //its not goin to be that easy

        // add debug flag
        for (let i = 0; i < width; i++) {
            for (let j = 0; j < height; j++) {
                let elem = document.createElement("span");
                elem.setAttribute("id", `${i};${j}`);//dunno
                elem.innerText = "⬛";//this is just for empty cell
                elem.addEventListener("mouseenter", () => { elem.style.filter = "invert(1) sepia(1) saturate(100) hue-rotate(-40deg)"});
                elem.addEventListener("mouseleave", () => { elem.style.filter = ""});
                // Game.cells.array[i][j].hash = MurMurHash.ToHash(elem.innerText, 0);
                // elem.style.filter = "invert(1)";
                gameWindow.append(elem);
            }
        }

        //load Gameobject from ./gameobjects 
        
        //load html..
        fetch("http://localhost:8080/gameobjects/")
        .then(response => response.text())
        .then(data => this.ParseGameObjects(data))
        .catch(error => console.error(error));

        
        

        
    }


    ParseGameObjects(html: string):void 
    {
        let queryElem: HTMLElement = document.createElement("div");
        queryElem.innerHTML = html;
        let linkElements: NodeListOf<HTMLAnchorElement> | undefined = queryElem?.querySelectorAll("a");
        for (let i = 3; i < linkElements.length; i++) {
            const element = linkElements[i];
            let gameObject:string = element.getAttribute("title")!;
            let option:HTMLElement = document.createElement("option");
            option.innerText = gameObject;
            option.setAttribute("value", gameObject);
            this.shadowRoot!.getElementById("GameobjectSelector")?.append(option);
        }
        //linkElements: NodeListOf<HTMLElement> = [];
        // insert elems into Select thingy
    }



}

UIComponents.RegisterCustomUIComponent("ui-level-editor", UILevelEditor);

