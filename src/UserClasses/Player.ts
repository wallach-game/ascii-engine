import { GameObject} from '../CoreClasses/GameObject.js';
import { Coords } from '../CoreClasses/Coords.js';
import { IMoveable } from '../Interfaces/systemInterfaces/IMoveable.js'
// @ts-check

export class Player extends GameObject implements IMoveable {


     Move(direction: Coords, distance: number):void
    {
        this.coords = this.coords.Add(direction.Mul(distance));
    }

    Update(): void {
        this.coords.x +=1;
        if(this.coords.x >= 9)
        {
            this.coords.x = 0;
        }
    }

    public Player(){
        let corrds = new Coords;
        this.Move(corrds, 2);
    }
}