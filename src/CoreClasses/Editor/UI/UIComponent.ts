export class UIComponent {

    protected code:string ;

    constructor()
    {
      this.code = "";
    }

    GetComponent():HTMLElement {
      let comp = document.createElement("div");
        comp.innerHTML = this.code;
        return comp;
      }

}