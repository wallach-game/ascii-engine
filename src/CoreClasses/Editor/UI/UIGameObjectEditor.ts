import { UIComponents } from "./UIComponents.js";
export class UIGameObjectEditor extends HTMLElement {

    constructor() {
        super();
        this.attachShadow({mode: 'open'});
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
</div>
`;
    }
}

UIComponents.RegisterCustomUIComponent("ui-gameobject-editor",UIGameObjectEditor);

