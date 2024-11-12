import { UIComponents } from "./UIComponents.js";
import { Editor } from "../Editor.js";

export class UIOpenEditorButton extends HTMLElement {

    constructor() {
        super();
        this.attachShadow({ mode: 'open' });
    }


    connectedCallback(): void {
        this.shadowRoot!.innerHTML = `<input type="button" id="openEditorBtn" value="openGMeditor">`;

        this.shadowRoot!.getElementById("openEditorBtn")?.addEventListener("click", () => {
            Editor.OpenGameObjectEditor();   
        });
    }
}

UIComponents.RegisterCustomUIComponent("ui-open-editor-btn", UIOpenEditorButton);

