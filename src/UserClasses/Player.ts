import { GameObject} from '../CoreClasses/GameObject.js';
import { Coords } from '../CoreClasses/Coords.js';
import { IMoveable } from '../Interfaces/systemInterfaces/IMoveable.js'
// @ts-check

export class Player extends GameObject implements IMoveable {

    colors: string[] = ["green","red","blue","yellow"];
    cIndex: number = 0;


     Move(direction: Coords, distance: number):void
    {
        this.coords = this.coords.Add(direction.Mul(distance));
    }

    Update(): void {
        this.coords.x +=1;
        this.coords.y +=1;
        this.cIndex +=1;
        if(this.cIndex >=4)
        {
            this.cIndex = 0;
        }
        this.color = this.colors[this.cIndex];
        if(this.coords.x >= 9)
        {
            this.coords.x = 0;
            this.coords.y = 0;
        }
        
    }

    public Player(){
        let corrds = new Coords;
        this.Move(corrds, 2);
    }
}