import { UIComponents } from "./UIComponents.js";
import { ComponentRegistry } from "../../ComponentRegistry.js";
import { Editor } from "../Editor.js";
export class UIGameObjectEditor extends HTMLElement {

    public classes: string[] = [];

    constructor() {
        super();
        this.attachShadow({ mode: 'open' });
    }


    connectedCallback(): void {
        this.shadowRoot!.innerHTML =
            `
<div style="display: flex; flex-direction: column;">
<span style="color: white;">create GameObject</span>
<input type="button" value="➕" id="createGameObject">
<input type="button" value="🔄️" id="loadGameObject">
<input type="text" id="gmSymbol" placeholder="symbol">
<input type="color" name="" id="gmColor">
<input type="file" name="" id="gmScript">
<select name="" id="classSelector"></select>
</div>
`;

this.InsertClasses();
    }


InsertClasses():void {

    let selector = this.shadowRoot!.getElementById("classSelector");
    console.log(selector);
    Editor.classes.forEach(component => {
        let elem = document.createElement("option");
        elem.innerText = component
        elem.setAttribute("value", component);
        console.log(elem);
        selector?.appendChild(elem);
    });
}

}

UIComponents.RegisterCustomUIComponent("ui-gameobject-editor", UIGameObjectEditor);

