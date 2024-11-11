import { UIComponent } from "./UIComponent";


export class UIComponents {

    private static customComponents: Array<UIComponent> = [];


    public static RegisterCustomUIComponent(name:string,compConst: CustomElementConstructor):void
    {
        this.customComponents.push(new UIComponent(name));
    }


    public static GetRegisteredComponents():Array<UIComponent> 
    {
        return this.customComponents;
    }


}



export function RegUIComp(name: string)
{
    return function (target: Function)
    {
        // UIComponent.arguments.register her blah blah
        UIComponents.RegisterCustomUIComponent(name,target);
    }
}