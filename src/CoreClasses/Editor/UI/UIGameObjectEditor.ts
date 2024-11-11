import { UIComponent } from "./UIComponent.js";
import { RegUIComp } from "./UIComponents.js";

@RegUIComp("GameObjectEditor")
export class UIGameObjectEditor extends UIComponent {

    constructor(name: string) {
        super(name);
        this.code =
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