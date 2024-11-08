import { GameObject} from '../CoreClasses/GameObject.js';
import { Coords } from '../CoreClasses/Coords.js';
import { IMoveable } from '../Interfaces/systemInterfaces/IMoveable.js'
import { WholeNumberCompensator2D } from '../CoreClasses/Helpers/WholeNumberCompensator2D.js';
import { WholeNumberCompensator } from '../CoreClasses/Helpers/WholeNumberCompensator.js';
import { Input } from '../CoreClasses/Input.js';
// @ts-check

export class Player extends GameObject implements IMoveable {

    colors: string[] = ["green","red","blue","yellow"];
    cIndex: number = 0;
    movementCompensator: WholeNumberCompensator2D = new WholeNumberCompensator2D();
    colorIndexCompensator: WholeNumberCompensator = new WholeNumberCompensator();


     Move(direction: Coords, distance: number):void
    {
        this.coords = this.coords.Add(direction.Mul(distance));
    }

    Update(): void {
        console.log(Input.GetKey("f"));
        // this.coords.x += Math.ceil(2 * Game.DeltaTime());
        // this.coords.y += Math.ceil(2 * Game.DeltaTime());
        let dir = new Coords();
        dir.x = 1;
        dir.y = 1;
        this.movementCompensator.AccumulateChange(dir.Mul(4));
        this.coords.Add(this.movementCompensator.GetChange());
        //console.log(this.coords)




        this.colorIndexCompensator.AccumulateChange(2);
        this.cIndex += this.colorIndexCompensator.GetChange();

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