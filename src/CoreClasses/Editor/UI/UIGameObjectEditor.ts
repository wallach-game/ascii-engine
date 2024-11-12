import { Editor } from "../Editor.js";
import { UIComponents } from "./UIComponents.js";
import { ComponentRegistry } from "../../ComponentRegistry.js";
export class UIGameObjectEditor extends HTMLElement {

    public classes: string[] = [];
    gameObjectVizualization: HTMLElement | null = document.createElement("p");

    constructor() {
        super();
        this.attachShadow({ mode: 'open' });
    }


    connectedCallback(): void {
        this.shadowRoot!.innerHTML =
            `
<div style="display: flex; flex-direction: column;">
    <span id="gameobject"></span>
<span style="color: white;">create GameObject</span>
<input type="button" value="➕" id="createGameObject">
<input type="button" value="🔄️" id="loadGameObject">
<input type="button" value="💾" id="saveGameObject">
<input type="text" id="gmSymbol" placeholder="symbol">
<input type="text" id="gmFilter" placeholder="filter">
<input type="color" name="" id="gmColor">
<input type="file" name="" id="gmScript">
<select name="" id="classSelector"></select>
</div>
`;

        window.onload = () => { this.InsertClasses(); };
    }


    InsertClasses(): void {
        console.log("classes lodaing");
        let selector = this.shadowRoot!.getElementById("classSelector");
        console.log(selector);
        Editor.classes.forEach(component => {
            let elem = document.createElement("option");
            elem.innerText = component
            elem.setAttribute("value", component);
            console.log(elem);
            selector?.appendChild(elem);
        });
        //this.EditorInit();
        this.EditorInit();
    }

    EditorInit(): void {
        this.gameObjectVizualization = this.shadowRoot!.getElementById("gameobject");
        let symbolInput = this.shadowRoot!.getElementById("gmSymbol") as HTMLInputElement;
        let filterInput = this.shadowRoot!.getElementById("gmFilter") as HTMLInputElement;
        let saveButton = this.shadowRoot!.getElementById("saveGameObject") as HTMLInputElement;
        let selectorInput = this.shadowRoot!.getElementById("classSelector") as HTMLInputElement;
        console.log(this.gameObjectVizualization);
        let colorInput = this.shadowRoot!.getElementById("gmColor") as HTMLInputElement;
        symbolInput!.addEventListener("change", () => {
            this.gameObjectVizualization!.innerText = symbolInput.value;
            console.log(symbolInput.value.toString());
        });
        colorInput!.addEventListener("change", () => {
            this.gameObjectVizualization!.style.color = colorInput.value;
        });
        filterInput!.addEventListener("change", () => {
            this.gameObjectVizualization!.style.filter = filterInput.value;
        });
        saveButton!.addEventListener("click", () => {
            this.SaveGameObject(symbolInput.value, colorInput.value, filterInput.value, selectorInput.value);
        });
    }

    SaveGameObject(symbol: string, color: string, filter: string, _class: string): void {
        let gm: Object = {
            symbol: symbol,
            color: color,
            filter: filter,
            class: _class
        };
        console.log("saving");
        fetch('http://localhost:3000/save-gameobject', {
            method: 'POST',
            headers: {
                'Content-Type': 'application/json',  // Set the content type to JSON
            },
            body: JSON.stringify(gm), // Send the string and filename in the request body
        })
            .then(response => response.json())  // Parse the JSON response
            .then(data => {
                console.log('Success:', data);
            })
            .catch((error) => {
                console.error('Error:', error);
            });

    }
}

UIComponents.RegisterCustomUIComponent("ui-gameobject-editor", UIGameObjectEditor);

