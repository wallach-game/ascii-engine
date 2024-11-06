"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.GameObject = void 0;
const Coords_1 = require("../CoreClasses/Coords");
class GameObject {
    constructor() {
        this.coords = new Coords_1.Coords();
        this.symbol = "";
        this.color = "#fff";
    }
}
exports.GameObject = GameObject;
