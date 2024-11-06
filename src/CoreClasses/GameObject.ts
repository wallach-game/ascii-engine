import { Coords } from '../CoreClasses/Coords'
import { Game } from './Game';

    export class GameObject {
        coords:  Coords = new Coords();
        symbol: string = "";
        color: string = "#fff";
//test
        Start():void {}
        Update():void {}


        Destroy():void {
            Game.RemoveGameobject(this);
        }
    }
