var __esDecorate = (this && this.__esDecorate) || function (ctor, descriptorIn, decorators, contextIn, initializers, extraInitializers) {
    function accept(f) { if (f !== void 0 && typeof f !== "function") throw new TypeError("Function expected"); return f; }
    var kind = contextIn.kind, key = kind === "getter" ? "get" : kind === "setter" ? "set" : "value";
    var target = !descriptorIn && ctor ? contextIn["static"] ? ctor : ctor.prototype : null;
    var descriptor = descriptorIn || (target ? Object.getOwnPropertyDescriptor(target, contextIn.name) : {});
    var _, done = false;
    for (var i = decorators.length - 1; i >= 0; i--) {
        var context = {};
        for (var p in contextIn) context[p] = p === "access" ? {} : contextIn[p];
        for (var p in contextIn.access) context.access[p] = contextIn.access[p];
        context.addInitializer = function (f) { if (done) throw new TypeError("Cannot add initializers after decoration has completed"); extraInitializers.push(accept(f || null)); };
        var result = (0, decorators[i])(kind === "accessor" ? { get: descriptor.get, set: descriptor.set } : descriptor[key], context);
        if (kind === "accessor") {
            if (result === void 0) continue;
            if (result === null || typeof result !== "object") throw new TypeError("Object expected");
            if (_ = accept(result.get)) descriptor.get = _;
            if (_ = accept(result.set)) descriptor.set = _;
            if (_ = accept(result.init)) initializers.unshift(_);
        }
        else if (_ = accept(result)) {
            if (kind === "field") initializers.unshift(_);
            else descriptor[key] = _;
        }
    }
    if (target) Object.defineProperty(target, contextIn.name, descriptor);
    done = true;
};
var __runInitializers = (this && this.__runInitializers) || function (thisArg, initializers, value) {
    var useValue = arguments.length > 2;
    for (var i = 0; i < initializers.length; i++) {
        value = useValue ? initializers[i].call(thisArg, value) : initializers[i].call(thisArg);
    }
    return useValue ? value : void 0;
};
var __setFunctionName = (this && this.__setFunctionName) || function (f, name, prefix) {
    if (typeof name === "symbol") name = name.description ? "[".concat(name.description, "]") : "";
    return Object.defineProperty(f, "name", { configurable: true, value: prefix ? "".concat(prefix, " ", name) : name });
};
import { GameObject } from '../CoreClasses/GameObject.js';
import { Coords } from '../CoreClasses/Coords.js';
import { WholeNumberCompensator2D } from '../CoreClasses/Helpers/WholeNumberCompensator2D.js';
import { WholeNumberCompensator } from '../CoreClasses/Helpers/WholeNumberCompensator.js';
import { Input } from '../CoreClasses/Input.js';
import { RegComp } from '../CoreClasses/ComponentRegistry.js';
// @ts-check
let Player = (() => {
    let _classDecorators = [RegComp("Player")];
    let _classDescriptor;
    let _classExtraInitializers = [];
    let _classThis;
    let _classSuper = GameObject;
    var Player = _classThis = class extends _classSuper {
        constructor() {
            super(...arguments);
            this.colors = ["green", "red", "blue", "yellow"];
            this.cIndex = 0;
            this.movementCompensator = new WholeNumberCompensator2D();
            this.colorIndexCompensator = new WholeNumberCompensator();
        }
        Move(direction, distance) {
            this.coords = this.coords.Add(direction.Mul(distance));
        }
        Update() {
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
            if (this.cIndex >= 4) {
                this.cIndex = 0;
            }
            this.color = this.colors[this.cIndex];
            if (this.coords.x >= 9) {
                this.coords.x = 0;
                this.coords.y = 0;
            }
        }
        Player() {
            let corrds = new Coords;
            this.Move(corrds, 2);
        }
    };
    __setFunctionName(_classThis, "Player");
    (() => {
        var _a;
        const _metadata = typeof Symbol === "function" && Symbol.metadata ? Object.create((_a = _classSuper[Symbol.metadata]) !== null && _a !== void 0 ? _a : null) : void 0;
        __esDecorate(null, _classDescriptor = { value: _classThis }, _classDecorators, { kind: "class", name: _classThis.name, metadata: _metadata }, null, _classExtraInitializers);
        Player = _classThis = _classDescriptor.value;
        if (_metadata) Object.defineProperty(_classThis, Symbol.metadata, { enumerable: true, configurable: true, writable: true, value: _metadata });
        __runInitializers(_classThis, _classExtraInitializers);
    })();
    return Player = _classThis;
})();
export { Player };
