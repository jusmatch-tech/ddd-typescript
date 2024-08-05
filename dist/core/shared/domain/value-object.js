"use strict";
Object.defineProperty(exports, "__esModule", {
    value: true
});
Object.defineProperty(exports, "ValueObject", {
    enumerable: true,
    get: function() {
        return ValueObject;
    }
});
const _lodash = require("lodash");
let ValueObject = class ValueObject {
    equals(vo) {
        if (vo === null || vo === undefined) {
            return false;
        }
        if (vo.constructor.name !== this.constructor.name) {
            return false;
        }
        return (0, _lodash.isEqual)(vo, this);
    }
};

//# sourceMappingURL=value-object.js.map