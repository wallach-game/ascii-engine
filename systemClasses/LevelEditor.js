class LevelEditor {
    constructor()
    {
        this.init();
        this.mouseCoordsElem = document.getElementsByClassName('mouseCoords')[0];
        this.mouseCoords = {};
        this.userObjects = new UserObjects();
        this.placedObjects = [];
    
        document.body.addEventListener("keydown" ,(event) => {
            if(event.key == "p") this.placeObject(this.mouseCoords);
        });
    }

    setMouseCoords(coords){
        this.mouseCoordsElem.innerHTML = `X: ${coords.x} Y: ${coords.y}`;
        this.mouseCoords = coords;
        // console.log(coords);
    }

    placeObject(coords)
    {
        Game.gameObjects[coords.obj.id].ltInit = false;
        let object = new EditorObject(coords.x, coords.y,this.userObjects.selectedObject.symbol,this.userObjects.selectedObject.collision);
        object.id = coords.obj.id 
        object.init();
        Game.gameObjects[coords.obj.id] = object;
        //TODO fix why it crashed after second wall is placed
        //this.placedObjects.push(object);
    }

    init()
    {
        for (let i = 0; i < 25; i++) {
            for (let j = 0; j < 80; j++) {
                let editorObject = new EditorObject(j,i,"\u00A0",false);
                Game.addGameObject(editorObject);
                editorObject.init();
            }
        }
    }
}