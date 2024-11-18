import { Editor } from "../Editor.js";
import { UIComponents } from "./UIComponents.js";
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
        let loadButton = this.shadowRoot!.getElementById("loadGameObject") as HTMLInputElement;
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
        loadButton!.addEventListener("click", () => {
            this.LoadGameObject();
        })
    }

    SaveGameObject(symbol: string, color: string, filter: string, _class: string): void {
        let gm: Object = {
            symbol: symbol,
            color: color,
            filter: filter,
            class: _class
        };
        let filename: string = _class;
        let content: any = JSON.stringify(gm);
        console.log("saving");
        //create json blob and save it.
        const blob = new Blob([content], { type: 'text/json' });

        // Create a link element
        const link = document.createElement('a');
        link.href = URL.createObjectURL(blob);

        // Set the download attribute with the desired file name
        link.download = filename + ".json";

        // Append the link to the body (this is needed for Firefox)
        document.body.appendChild(link);

        // Programmatically click the link to trigger the download
        link.click();

        // Remove the link from the document
        document.body.removeChild(link);
    }


    LoadGameObject() {
        let gm: Object = {
            symbol: "",
            color: "",
            filter: "",
            class: ""
        };
        const input = document.createElement('input');
        input.type = 'file';
        input.accept = '.json'; // Only allow .json files

        // Set up an event listener to handle file selection
        input.onchange = (event: Event) => {
            const target = event.target as HTMLInputElement;
            if (target.files && target.files.length > 0) {
                const file = target.files[0];

                // Use FileReader to read the contents of the selected file
                const reader = new FileReader();
                reader.onload = (e) => {
                    const content = e.target?.result as string;
                    try {
                        // Parse JSON content
                        let gm:any = JSON.parse(content);
                        console.log('Game Object Loaded:', gm);
                        let symbolInput = this.shadowRoot!.getElementById("gmSymbol") as HTMLInputElement;
                        symbolInput.value = gm.symbol;
                        let filterInput = this.shadowRoot!.getElementById("gmFilter") as HTMLInputElement;
                        filterInput.value = gm.filter;
                        let colorInput = this.shadowRoot!.getElementById("gmColor") as HTMLInputElement;
                        colorInput.value = gm.color;
                        let classSelect = this.shadowRoot!.getElementById("classSelector") as HTMLSelectElement;
                        classSelect.value = gm.class;

                        this.gameObjectVizualization!.innerText = gm.symbol;
                        this.gameObjectVizualization!.style.color = gm.color;
                        this.gameObjectVizualization!.style.filter = gm.filter;
                        // Handle the loaded game object here
                    } catch (error) {
                        console.error('Error parsing JSON:', error);
                    }
                };

                // Read the file as text
                reader.readAsText(file);
            }
        };

        // Programmatically trigger the file picker by clicking the input
        input.click();
    }
}

UIComponents.RegisterCustomUIComponent("ui-gameobject-editor", UIGameObjectEditor);

