import { Type } from "../../../node_modules/typescript/lib/typescript";

export class Array2D<Type> {
    array: Type[][];


    constructor(width: number, height: number, defaultValue: Type) {
        this.array = Array.from({ length: width }, () =>
            Array.from({ length: height }, () => this.clone(defaultValue))
        );
    }

    private clone(item: Type): Type {
        // Use a shallow copy function for cloning the default object if needed
        return { ...item } as Type;
    }


    Access(x:number,y:number):Type {
        return this.array[x][y];
    }

    Write(x:number,y:number, elem: Type):void {
        this.array[x][y] = elem;
    }

    ActionWithAll(func: (elem: Type) => void):void 
    {
        for (let i = 0; i < this.array.length; i++) {
            for (let j = 0; j < this.array[i].length; j++) {
                let elem = this.array[i][j];
                func(elem);
            }
        }
    }

}