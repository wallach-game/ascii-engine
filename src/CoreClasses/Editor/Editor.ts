import { Player } from "../../UserClasses/Player.js";
import { GameObject } from "../GameObject.js";
import { OpenWindowWithComponent } from "./OpenWindowWithComponent.js";
import { UIGameObjectEditor } from "./UI/UIGameObjectEditor.js";



export class Editor {

     gameObjectEditorUI: UIGameObjectEditor = new UIGameObjectEditor();

    public Init() {
        document.title ="Editor";
        document.body.style.backgroundColor = "#111111";
        OpenWindowWithComponent.OpenWindowWithComp(this.gameObjectEditorUI);
    }


    CreateGameObject():void
    {
        let object: any = {};
        let params: any[] = [];
        object.gameObject = new Player();
        params = Object.keys(object.gameObject);
        
    }
}
