import { MurMurHash } from "./Helpers/MurMurHash.js";
export class Input {

    private static pressedKeys: { [key: number]: boolean } = {};

    public static Init(): void {
        document.addEventListener("keydown", (e) => {Input.HandleInput(e,true)} )
        document.addEventListener("keyup", (e) => {Input.HandleInput(e,false)} )
    }

    static HandleInput(event: KeyboardEvent, pressed: boolean)
    {
        if(pressed) Input.pressedKeys[MurMurHash.ToHash(event.key,0)] = true;

        else Input.pressedKeys[MurMurHash.ToHash(event.key,0)] = false;
    }

    public static GetKey(key:string = "", hash: number = -1):boolean
    {
        let pressed: boolean = false;
        if(hash == -1)
        {
            try{pressed = Input.pressedKeys[MurMurHash.ToHash(key,0)];}
            catch {}
        }
        else
        {
            try {pressed = Input.pressedKeys[hash];}
            catch {}
        }
        if(pressed == undefined) return false;
        return pressed;
    }
}