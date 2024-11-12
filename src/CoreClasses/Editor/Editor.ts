import { ComponentRegistry } from "../ComponentRegistry.js";
import { GameObject } from "../GameObject.js";
import { Player } from "../../UserClasses/Player.js";
import { OpenWindowWithComponent } from "./OpenWindowWithComponent.js";
import { UIGameObjectEditor } from "./UI/UIGameObjectEditor.js";
import { UIOpenEditorButton } from "./UI/UIOpenEditorButton.js";


export class Editor {



    static classes: string[] = ComponentRegistry.GetAllComponents();



    public Init() {
        document.title ="Editor";
        document.body.style.backgroundColor = "#111111";
        let openGmEditorComp = new UIOpenEditorButton();

    }


    CreateGameObject():void
    {
        let object: any = {};
        let params: any[] = [];
        object.gameObject = new Player();
        params = Object.keys(object.gameObject);
    }

    static OpenGameObjectEditor():void
    {
        let editorComp: UIGameObjectEditor = new UIGameObjectEditor();
        editorComp.classes = ComponentRegistry.GetAllComponents();
        OpenWindowWithComponent.OpenWindowWithComp(editorComp);
        console.log(this.classes.length);
    }
}