import { MurMurHash } from "../../Helpers/MurMurHash";


export class UIComponent extends HTMLElement {

  protected code: string;
  name: string;
  nameHash: number;
  cons: CustomElementConstructor = undefined;

  constructor(name: string) {
    super();
    this.code = "";
    this.name = name;
    this.nameHash = MurMurHash.ToHash(name);
  }

  GetComponent(): HTMLElement {
    let comp = document.createElement("div");
    comp.innerHTML = this.code;
    return comp;
  }
}