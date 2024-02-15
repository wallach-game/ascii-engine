class EditorObject extends GameObject {
    constructor(x, y, symbol, collision) {
        super(x, y, symbol, collision);
        this.ltInit = true;
    }

    init() {
        this.symbol = `<span id="editorObj${this.id}" class="editorObject">${this.symbol}</span>`;
    }

    lateInit() {
        let DOMelem = document.getElementById("editorObj" + this.id);
        // console.log("editorObj" + this.id);
        DOMelem.addEventListener('pointerover', () => {
            Game.levelEditor.setMouseCoords({x: this.x, y: this.y, obj: this});
            Game.selectedId = this.id;
        });
        // DOMelem.addEventListener('pointerleave', () => { 
        //     console.log("leave");
        //     this.symbol = `<span id="editorObj${this.id}" class="editorObject">□</span>` });
    }
}