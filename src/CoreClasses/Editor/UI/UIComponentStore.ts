import { MurMurHash } from "../../Helpers/MurMurHash.js";


export class UIComponentStore {
    name:string;
    nameHash:number;
    const: CustomElementConstructor;
    constructor(name:string, constructor: CustomElementConstructor)
    {
        this.name = name;
        this.nameHash = MurMurHash.ToHash(name);
        this.const = constructor;
    }
}