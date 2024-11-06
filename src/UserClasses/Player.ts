import { GameObject} from '../CoreClasses/GameObject';
import { Coords } from '../CoreClasses/Coords';
import { IMoveable } from '../Interfaces/IMoveable'
// @ts-check

class Player extends GameObject implements IMoveable {


     Move(direction: Coords, distance: number):void
    {
        
    }

    public Player(){
        let corrds = new Coords;
        this.Move(corrds, 2);
    }

}