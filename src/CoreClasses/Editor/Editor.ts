import { ComponentRegistry } from "../ComponentRegistry.js";
import { GameObject } from "../GameObject.js";
import { Player } from "../../UserClasses/Player.js";
import { OpenWindowWithComponent } from "./OpenWindowWithComponent.js";
import { UIGameObjectEditor } from "./UI/UIGameObjectEditor.js";
import { UILevelEditor } from "./UI/UILevelEditor.js";
import { UIOpenGameObjectEditorButton } from "./UI/UIOpenGameObjectEditorButton.js";
import { UIOpenLevelEditorButton } from "./UI/UIOpenLevelEditor.js";


export class Editor {



    static classes: string[] = ComponentRegistry.GetAllComponents();



    public Init() {
        debugger;
        document.title ="Editor";
        document.body.style.backgroundColor = "#111111";
        let openGmEditorComp = new UIOpenGameObjectEditorButton();
        let openLevelEditorComp = new UIOpenLevelEditorButton();

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
    }

    static OpenLevelEditor():void
    {
        let levelEditor = new UILevelEditor()
        OpenWindowWithComponent.OpenWindowWithComp(levelEditor);
    }
}