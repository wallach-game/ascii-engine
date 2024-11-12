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
<input type="text" id="gmSymbol" placeholder="symbol">
<input type="text" id="gmFilter" placeholder="filter">
<input type="color" name="" id="gmColor">
<input type="file" name="" id="gmScript">
<select name="" id="classSelector"></select>
</div>
`;

window.onload = () => { this.InsertClasses();};
    }


InsertClasses():void {
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

EditorInit():void{
    this.gameObjectVizualization = this.shadowRoot!.getElementById("gameobject");
    let symbolInput = this.shadowRoot!.getElementById("gmSymbol") as HTMLInputElement;
    let filterInput = this.shadowRoot!.getElementById("gmFilter") as HTMLInputElement;
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
}

}

UIComponents.RegisterCustomUIComponent("ui-gameobject-editor", UIGameObjectEditor);

