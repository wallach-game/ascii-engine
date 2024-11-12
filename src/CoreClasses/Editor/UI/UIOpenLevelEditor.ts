import { UIComponents } from "./UIComponents.js";
import { Editor } from "../Editor.js";

export class UIOpenLevelEditorButton extends HTMLElement {

    constructor() {
        super();
        this.attachShadow({ mode: 'open' });
    }


    connectedCallback(): void {
        this.shadowRoot!.innerHTML = `<input type="button" id="openEditorBtn" value="openLeveleditor">`;

        this.shadowRoot!.getElementById("openEditorBtn")?.addEventListener("click", () => {
            Editor.OpenLevelEditor();   
        });
    }
}

UIComponents.RegisterCustomUIComponent("ui-open-level-editor-btn", UIOpenLevelEditorButton);

