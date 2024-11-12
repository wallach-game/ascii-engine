import { UIComponentStore } from "./UIComponentStore.js";


export class UIComponents {

    private static customComponents: Array<UIComponentStore> = [];


    public static RegisterCustomUIComponent(name:string,compConst: CustomElementConstructor):void
    {
        this.customComponents.push(new UIComponentStore(name, compConst));
        window.customElements.define(name, compConst);
    }


    public static GetRegisteredComponents():Array<UIComponentStore> 
    {
        return this.customComponents;
    }


}



export function RegUIComp(name: string)
{
    return function (target: Function)
    {
        // UIComponent.arguments.register her blah blah
        UIComponents.RegisterCustomUIComponent(name,target as CustomElementConstructor);
    }
}