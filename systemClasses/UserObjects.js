class UserObjects {
    constructor()
    {
        this.userObjects = [];
        this.objectSelector = document.getElementsByClassName("objectSelector")[0];
        this.createNewObject({symbol: "■", collison: true, name: "Wall", id: 0});
        this.selectedObject = this.userObjects[0];  
    }

    createNewObject(objSettings)
    {
        this.userObjects.push(new EditorObject(0,0,objSettings.symbol,objSettings.collison));
        this.objectSelector.innerHTML = this.objectSelector.innerHTML  + `<option value="${objSettings.id}">${objSettings.name}</option>`;
    }
}