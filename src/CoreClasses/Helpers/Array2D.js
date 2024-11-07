export class Array2D {
    constructor(width, height, defaultValue) {
        this.array = Array.from({ length: width }, () => Array.from({ length: height }, () => this.clone(defaultValue)));
    }
    clone(item) {
        // Use a shallow copy function for cloning the default object if needed
        return Object.assign({}, item);
    }
    Access(x, y) {
        return this.array[x][y];
    }
    Write(x, y, elem) {
        this.array[x][y] = elem;
    }
    ActionWithAll(func) {
        for (let i = 0; i < this.array.length; i++) {
            for (let j = 0; j < this.array[i].length; j++) {
                let elem = this.array[i][j];
                func(elem);
            }
        }
    }
}
