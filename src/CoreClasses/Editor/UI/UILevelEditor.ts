import { UIComponents } from "./UIComponents.js";
import { Editor } from "../Editor.js";
export class UILevelEditor extends HTMLElement {

    public classes: string[] = [];

    constructor() {
        super();
        this.attachShadow({ mode: 'open' });
    }


    connectedCallback(): void {
        this.shadowRoot!.innerHTML =
            `
            level editor lol
`;
    }



}

UIComponents.RegisterCustomUIComponent("ui-level-editor", UILevelEditor);

