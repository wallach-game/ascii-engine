
import { Coords } from "../../CoreClasses/Coords";    
    export interface IMoveable {
        Move (direction: Coords, distance: number): void;
    }
    