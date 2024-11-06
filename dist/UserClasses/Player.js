"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
const GameObject_1 = require("../CoreClasses/GameObject");
const Coords_1 = require("../CoreClasses/Coords");
// @ts-check
class Player extends GameObject_1.GameObject {
    Move(direction, distance) {
    }
    Player() {
        let corrds = new Coords_1.Coords;
        this.Move(corrds, 2);
    }
}
