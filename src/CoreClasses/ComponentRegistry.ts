import { NodeBuilderFlags } from "../../node_modules/typescript/lib/typescript";
import { MurMurHash } from "./Helpers/MurMurHash.js";



export class ComponentRegistry {

    private static components: Array<Component> = [];


    public static RegisterComponent(comp: Component):void
    {
        this.components.push(comp);
    }


    public static GetComponent():Component
    {
        //not implemtmted yet.
        return new Component("brb",()=>{});
    }


    public static GetAllComponents():Array<string>
    {
        let compNames: Array<string> = [];
        ComponentRegistry.components.forEach(comp => {
            compNames.push(comp.name);
        });
        return compNames;
    }

}

export class Component {

    public nameHash: number;
    public name:string;
    public compConstructor: Function;


    constructor(name: string, constFunc: Function) 
    {
        this.nameHash = MurMurHash.ToHash(name);
        this.name = name;
        this.compConstructor = constFunc;
    }

}


export function RegComp (name:string)
{
    return function (target: Function)
    {
        ComponentRegistry.RegisterComponent(new Component(name, target));
    }
}
